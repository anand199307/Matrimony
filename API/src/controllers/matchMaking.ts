import { Request, Response } from "express";
import { UserModel } from "../models/user";
import {
  generateRandomDigitNumber,
  errorResponse,
  successResponse,
} from "../helpers";

// Calculate matching score function
// Calculate matching score function
function calculateMatchingScore(userA: any, userB: any) {
  let matchingScore = 0;
  console.log("users", userA, userB);

  // Age matching (higher score for closer ages)
  if (userA.age && userB.age) {
    const ageDifference = Math.abs(userA.age - userB.age);
    matchingScore += Math.max(0, 10 - ageDifference);
  }

  // Height matching (higher score for closer heights)
  if (userA.basicDetails.height && userB.basicDetails.height) {
    const heightDifference = Math.abs(
      parseFloat(userA.basicDetails.height) -
        parseFloat(userB.basicDetails.height)
    );
    matchingScore += Math.max(0, 10 - heightDifference);
  }

  // Marital Status matching
  if (userA.basicDetails.maritalStatus === userB.basicDetails.maritalStatus) {
    matchingScore += 5;
  }

  // Religion matching
  if (userA.religionDetails.religion === userB.religionDetails.religion) {
    matchingScore += 5;
  }

  // Caste matching
  if (userA.religionDetails.caste === userB.religionDetails.caste) {
    matchingScore += 5;
  }

  // Star matching
  if (userA.religiousDetails.star === userB.religiousDetails.star) {
    matchingScore += 5;
  }

  // Education matching (higher score for more education matches)
  // Add your logic for education matching here if needed

  // Occupation matching (higher score for more occupation matches)
  // Add your logic for occupation matching here if needed

  // Diet Habit matching
  // if (userA.lifeStyleDetails.dietHabit === userB.partnerPreferences.basicInformation.dietHabit) {
  //   matchingScore += 3;
  // }

  // Smoking Habit matching
  // if (userA.lifeStyleDetails.smokingHabit === userB.partnerPreferences.basicInformation.smokingHabit) {
  //   matchingScore += 3;
  // }

  // Drinking Habit matching
  // if (userA.lifeStyleDetails.drinkingHabit === userB.partnerPreferences.basicInformation.drinkingHabit) {
  //   matchingScore += 3;
  // }

  // Add more criteria based on partner preferences if needed

  return matchingScore;
}

export const newMatchMaking = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const limit = res.locals.limit;
    const skip = res.locals.skip;
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Query the database to find potential matches
    const potentialMatchesQuery = {
      _id: { $ne: user?.id }, // Exclude the current user

      // Add additional filtering criteria based on partner preferences

      // Gender Preference
      gender: user.gender === "Male" ? "Female" : "Male", // Assuming opposite gender
      // Age Preference
      age: {
        $gte: parseInt(user.partnerPreferences.basicInformation.age.from),
        $lte: parseInt(user.partnerPreferences.basicInformation.age.to),
      },

      // Height Preference
      "basicDetails.height": {
        $gte: user.partnerPreferences.basicInformation.height.from,
        $lte: user.partnerPreferences.basicInformation.height.to,
      },

      // Marital Status Preference
      "basicDetails.maritalStatus":
        user.partnerPreferences.basicInformation.martialStatus.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.basicInformation.martialStatus,
            },

      // Religion Preference
      "religionDetails.religion":
        user.partnerPreferences.religiousPreferences.religion.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.religiousPreferences.religion,
            },

      // Caste Preference
      "religionDetails.caste":
        user.partnerPreferences.religiousPreferences.caste.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.religiousPreferences.caste,
            },

      // Star Preference
      "religiousDetails.star":
        user.partnerPreferences.religiousPreferences.star.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.religiousPreferences.star,
            },

      // Education Preference (Either "BE" or "Doctor" must be present, but if "Any" is selected, skip filtering)
      "careerDetails.education":
        user.partnerPreferences.professionalPreferences.education.includes(
          "Any"
        )
          ? { $exists: true } // Skip filtering
          : { $in: user.partnerPreferences.professionalPreferences.education },

      // Occupation Preference (Array)
      // 'careerDetails.occupation': user.partnerPreferences.professionalPreferences.occupation.includes("Any")
      //   ? { $exists: true } : {
      //     $in: user.partnerPreferences.professionalPreferences.occupation,
      //   },

      // Diet Habit Preference (Array)
      "lifeStyleDetails.dietHabit":
        user.partnerPreferences.basicInformation.dietHabit.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.basicInformation.dietHabit,
            },

      // Smoking Habit Preference
      "lifeStyleDetails.smokingHabit":
        user.partnerPreferences.basicInformation.smokingHabit === "No"
          ? "No"
          : { $exists: true },

      // Drinking Habit Preference
      "lifeStyleDetails.drinkingHabit":
        user.partnerPreferences.basicInformation.drinkingHabit === "No"
          ? "No"
          : { $exists: true },

      // Add more criteria based on partner preferences...
    };
    console.log(potentialMatchesQuery);
    // Execute the query and apply pagination
    const potentialMatches = await UserModel.find(potentialMatchesQuery)
      .skip(skip)
      .limit(limit);
    // Calculate matching scores for potential matches (you need to implement this function)
    const matchesWithScores = potentialMatches.map((match) => ({
      user: match,
      // matchingScore: calculateMatchingScore(user, match), // Implement this function
    }));

    // Sort potential matches by matching score (descending)
    // matchesWithScores.sort((a, b) => b.matchingScore - a.matchingScore);

    // Return the sorted list of matches
    return successResponse(res, 200, { data: potentialMatches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const newMatchMakingV2 = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const limit = res.locals.limit;
    const skip = res.locals.skip;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const potentialMatchesQuery = {
      _id: { $ne: user?.id }, // Exclude the current user

      // Gender Preference
      gender: user.gender === "Male" ? "Female" : "Male", // Assuming opposite gender

      // Basic Preference
      age: {
        $gte: parseInt(user.partnerPreferences.basicInformation.age.from),
        $lte: parseInt(user.partnerPreferences.basicInformation.age.to),
      },

      "basicDetails.height": {
        $gte: user.partnerPreferences.basicInformation.height.from,
        $lte: user.partnerPreferences.basicInformation.height.to,
      },

      "basicDetails.maritalStatus":
        user.partnerPreferences.basicInformation.martialStatus.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.basicInformation.martialStatus,
            },
      "basicDetails.physicalStatus":
        user.partnerPreferences.basicInformation.physicalStatus.includes(
          "Any" || "Normal"
        )
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.basicInformation.physicalStatus,
            },

      // Religion Preference
      "religionDetails.religion":
        user.basicDetails.willingToInterCommunity.toLowerCase() === "yes" ||
        user.partnerPreferences.religiousPreferences.religion.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.religiousPreferences.religion,
            },

      "religionDetails.caste":
        user.basicDetails.willingToInterCommunity.toLowerCase() === "yes" ||
        user.partnerPreferences.religiousPreferences.caste.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.religiousPreferences.caste,
            },

      // 'religionDetails.motherTongue': user.partnerPreferences.basicInformation.motherTongue.includes("Any")
      //   ? { $exists: true } : {
      //     $in: user.partnerPreferences.basicInformation.motherTongue,
      //   },

      // Star Preference and moonSign
      "religiousDetails.star":
        user.partnerPreferences.religiousPreferences.star?.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.religiousPreferences.star,
            },
      "religiousDetails.moonSign":
        user.partnerPreferences.religiousPreferences.moonSign?.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.religiousPreferences.moonSign,
            },
      "religiousDetails.doshamYes":
        user.religiousDetails.dosham.toLowerCase() !== "yes" ||
        user.partnerPreferences.religiousPreferences.dosham?.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.religiousPreferences.dosham,
            },

      "careerDetails.education":
        user.partnerPreferences.professionalPreferences.education?.includes(
          "Any"
        )
          ? { $exists: true }
          : { $in: user.partnerPreferences.professionalPreferences.education },

      "careerDetails.occupation":
        user.partnerPreferences.professionalPreferences.occupation?.includes(
          "Any"
        )
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.professionalPreferences.occupation,
            },

      "careerDetails.employedIn":
        user.partnerPreferences.professionalPreferences.employedIn?.includes(
          "Any"
        )
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.professionalPreferences.employedIn,
            },
      // Lifestyle
      "lifeStyleDetails.dietHabit":
        user.partnerPreferences.basicInformation.dietHabit.includes("Any")
          ? { $exists: true }
          : {
              $in: user.partnerPreferences.basicInformation.dietHabit,
            },

      "lifeStyleDetails.smokingHabit":
        user.partnerPreferences.basicInformation.smokingHabit === "No"
          ? "No"
          : { $exists: true },

      "lifeStyleDetails.drinkingHabit":
        user.partnerPreferences.basicInformation.drinkingHabit === "No"
          ? "No"
          : { $exists: true },
    };

    // Define the aggregation pipeline stages
    const pipeline = [
      {
        $match: potentialMatchesQuery,
      },
      {
        $project: {
          _id: 1,
          firstName: 1,
          email: 1,
          lastName: 1,
          uuid: 1,
          profileId: 1,
          dateOfBirth: 1,
          age: 1,
          gender: 1,
          phoneNumber: 1,
          membership: 1,
          avatar: 1,
          basicDetails: 1,
          locationDetails: 1,
          religionDetails: 1,
          careerDetails: 1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ];

    // Execute the aggregation pipeline
    const [potentialMatches, totalMatchesCount] = await Promise.all([
      UserModel.aggregate(pipeline),
      UserModel.countDocuments(potentialMatchesQuery),
    ]);
    // Return the sorted list of matches along with the total count
    return successResponse(res, 200, {
      data: potentialMatches,
      totalMatches: totalMatchesCount,
    });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const filterProfiles = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const limit = res.locals.limit;
    const skip = res.locals.skip;

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if any query parameters are provided
    if (Object.keys(req.query).length === 0) {
      return res.status(400).json({ error: "No query parameters provided" });
    }

    // Initialize filterCriteria with default values
    const filterCriteria: any = { $and: [] };
    // Add conditions for the opposite gender
    if (user.gender === "Male") {
      filterCriteria.$and.push({ gender: "Female" });
    } else {
      filterCriteria.$and.push({ gender: "Male" });
    }

    // Age range
    if (req.query.minAge && req.query.minAge!='' && req.query.maxAge && req.query.maxAge!='') {
      filterCriteria.$and.push({
        age: {
          $gte: parseInt(req.query.minAge as string),
          $lte: parseInt(req.query.maxAge as string),
        },
      });
    }

    // Height range
    if (req.query.minHeight && req.query.minHeight!='' && req.query.maxHeight && req.query.maxHeight!='') {
      filterCriteria.$and.push({
        "basicDetails.height": {
          $gte: parseFloat(req.query.minHeight as string),
          $lte: parseFloat(req.query.maxHeight as string),
        },
      });
    }

    // Marital status
    if (typeof req.query.maritalStatus ==='string' && req.query.maritalStatus.length > 0 && req.query.maritalStatus.toLowerCase() !='any') {
      const maritalStatus = Array.isArray(req.query.maritalStatus)
        ? req.query.maritalStatus
        : [req.query.maritalStatus];
      filterCriteria.$and.push({
        "basicDetails.maritalStatus": { $in: maritalStatus },
      });
    }

    // Mother tongue
    if (typeof req.query.motherTongue ==='string' && req.query.motherTongue.length > 0 && req.query.motherTongue.toLowerCase() !='any') {
      filterCriteria.$and.push({
        "religionDetails.motherTongue": req.query.motherTongue,
      });
    }

    // Physical status
    if (typeof req.query.physicalStatus ==='string' && req.query.physicalStatus.length > 0 && req.query.physicalStatus.toLowerCase() !='any') {
      filterCriteria.$and.push({
        "basicDetails.physicalStatus": req.query.physicalStatus,
      });
    }

    // Religion
    if (typeof req.query.religion === 'string' && req.query.religion.length > 0 && req.query.religion.toLowerCase() !='any' ) {
      filterCriteria.$and.push({
          "religionDetails.religion": req.query.religion,
      });
  }

    // Caste
    if (typeof req.query.caste ==='string' && req.query.caste.length > 0 && req.query.caste.toLowerCase() !='any') {
      filterCriteria.$and.push({ "religionDetails.caste": req.query.caste });
    }

    // Education
    if (typeof req.query.education ==='string' && req.query.education.length > 0 && req.query.education.toLowerCase() !='any') {
      filterCriteria.$and.push({
        "careerDetails.education": req.query.education,
      });
    }

    // Employed in
    if (typeof req.query.employedIn ==='string' && req.query.employedIn.length > 0 && req.query.employedIn.toLowerCase() !='any') {
      filterCriteria.$and.push({
        "careerDetails.employedIn": req.query.employedIn,
      });
    }

    // Occupation
    if (typeof req.query.occupation ==='string' && req.query.occupation.length > 0 && req.query.occupation.toLowerCase() !='any') {
      filterCriteria.$and.push({
        "careerDetails.occupation": req.query.occupation,
      });
    }

    // State
    if (typeof req.query.state ==='string' && req.query.state.length > 0 && req.query.state.toLowerCase() !='any') {
      filterCriteria.$and.push({ "locationDetails.state": req.query.state });
    }

    // City
    if (typeof req.query.city ==='string' && req.query.city.length > 0 && req.query.city.toLowerCase() !='any') {
      filterCriteria.$and.push({ "locationDetails.city": req.query.city });
    }
    // Fetch profiles matching the filter criteria
    const profiles = await UserModel.find(filterCriteria)
      .limit(limit)
      .skip(skip);

       // Count of filtered profiles
    const count = await UserModel.countDocuments(filterCriteria);

    res.status(200).json({ success: true,count:count, data: profiles });
  } catch (error) {
    console.error("Error filtering profiles:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
