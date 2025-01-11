import { Request, Response } from "express";
import { sendSms } from "../library/twilio";
import { 
  UserModel,
  getUserByUuid,
  getUserAllByUuid,
  getRecentUser,
  getRandomUsers } from "../models/user";
import {
  encryptPassword,
  errorResponse,
  generateProfileId,
  generateRandomDigitNumber,
  generateUUID,
  random,
  successResponse,
} from "../helpers";
import logger from "../library/logger";
import { validationResult } from "express-validator";
import { deleteImagefromGCP, generateV4UploadSignedUrl, generateV4UploadStoriesUrl } from "../library/gcs";
import { ZodiacModel } from "../models/zodiac";
import { sendEmail } from "../library/sendgrid";
import { generateUserProfilePDF } from "../library/generatepdf";


// getting all users with filter options and search by email,name
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { status, role, sortBy, sortOrder, search } = req.query;

    const filter: any = {};
    if (status) filter.status = status;
    if (role) filter.role = role;

    const sort: any = {};
    if (sortBy && typeof sortBy === 'string') {
      sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
    } else {
      // Sort by creation date in descending order by default
      sort.createdAt = -1;
    }
    const searchString = search ? String(search) : '';
    const searchRegex = new RegExp(searchString, 'i');
    filter.$or = [{ email: searchRegex }, { name: searchRegex }];

    const countQuery = UserModel.countDocuments(filter).exec();
    const usersQuery = UserModel.find(filter).sort(sort).exec();

    const [count, users] = await Promise.all([countQuery, usersQuery]);
    successResponse(res, 200, { users, count });
  } catch (error: any) {
    logger.error(error?.message);
    errorResponse(res, String(error));
    // return res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

export const currentUser = async (req: Request, res: Response) => {
  const { user } = res.locals;
  if (!user) {
    return res.sendStatus(404);
  }
  const data = { ...user.ToJSON(), userId: user.id };
  successResponse(res, 200, { data });
};

export const signOut = async (req: Request, res: Response) => {
  const { session, user } = res.locals;
  console.log(user,session);
  await session.sessionSignOut();
  await user.signOut();
  return res.status(200).json({ data: "Session Logged Out Successfully" });
};

export const phoneOtpSend = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    if (!user.phoneNumber) {
      throw new Error("404: Phone number not available!!");
    }

    if (user.isPhoneNumberVerified) {
      throw new Error("422: Phone number is already verified");
    }

    await user.phoneNumberCodeSetup();
    await user.save();
    let msg = `Your Royal Matromony verification code is: ${user.phoneNumberCode}`;
    if (user.phoneNumberCode) {
      await sendSms(String(user.phoneNumber), msg);
      successResponse(res, 200, { data: "Otp Sent Successfully" });
    } else {
      return res.status(404).json({ message: 'Something went wrong, please try again after some time!' });
    }
  } catch (error: any) {
    logger.error(error?.message);
    errorResponse(res, String(error));
  }
};


export const verifyPhoneOtp = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const { user } = res.locals;

    if (!code) {
      throw new Error("404:Param 'code' is missing");
    }

    if (user.isPhoneNumberVerified) {
      throw new Error("422:Phone number already verified");
    }
    if (code !== user.phoneNumberCode) {
      throw new Error("400:Invalid Otp");
    }

    if (user.phoneNumberCodeExpireAt) {
      if (user.phoneNumberCodeExpireAt < new Date()) {
        throw new Error("422:Otp code expired!");
      }
    } else {
      throw new Error("422:code expiry not found");
    }
    await user.phoneOtpVerified();
    successResponse(res, 200, { data: "Otp verified successfully" });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};

export const userOnbaording = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const {
      religionDetails,
      locationDetails,
      generalDetails,
      careerDetails,
      basicDetails,
      lifeStyleDetails,
      religiousDetails,
      horoscopeDetails,
      familyDetails,
      partnerPreferences,
      userVerificationDetails,
      profileStatus,
    } = req.body;

    if (!profileStatus) {
      throw new Error("404:Profile status is missing!!");
    }

    const errors = validationResult(req);
    // console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(422).json({ statusCode: 422, errors: errors.array() });
    }

    if (religionDetails) {
      user.religionDetails = religionDetails;
    }

    if (locationDetails) {
      user.locationDetails = locationDetails;
    }

    if (generalDetails) {
      user.generalDetails = generalDetails;
    }

    if (careerDetails) {
      user.careerDetails = careerDetails;
    }

    if (basicDetails) {
      user.basicDetails = basicDetails;
    }

    if (lifeStyleDetails) {
      user.lifeStyleDetails = lifeStyleDetails;
    }

    if (religiousDetails) {
      user.religiousDetails = religiousDetails;
    }

    if (horoscopeDetails) {
      user.horoscopeDetails = horoscopeDetails;
    }

    if (partnerPreferences) {
      user.partnerPreferences = partnerPreferences;
    }

    if (familyDetails) {
      user.familyDetails = familyDetails;
    }

    if (userVerificationDetails) {
      user.userVerificationDetails = userVerificationDetails;
    }

    user.profileStatus = Number(profileStatus);
    await user.save();
    successResponse(res, 200, { data: "Details Added Successfully" });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};

export const getSignedUrl = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const { imageType } = req.query;

    if (!imageType) {
      throw new Error("Param imageType not found");
    }
    const url = await generateV4UploadSignedUrl(user.uuid, String(imageType));
    successResponse(res, 200, {
      url: url[0],
    });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};

export const profileImageUpload = async (req: Request, res: Response) => {
  try {
    const { imageName, imageType } = req.body;
    const { user } = res.locals;
    if (!imageName || !imageType) throw new Error("404: Param imageName or imageType not found");

    if (imageType === 'profile') user.avatar = imageName;
    else if (imageType === 'id') user.userVerificationDetails.idDoc = imageName;
    else user.galleryPhoto.push(imageName);
    await user.save();
    successResponse(res, 200, { data: "Image Uploaded Successfully" });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};


//  Delte images from bucket
export const deleteProfileImage = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const { imageName, imageType } = req.body;
    if (!imageName || !imageType) throw new Error("404: Params are not found");

    const images = user.galleryPhoto.filter((image: String) => image !== imageName);
    if (images?.length === user.galleryPhoto?.length) throw new Error("404: Image not found in the user's gallery");

    if (imageType === 'profile') user.avatar = '';
    else if (imageType === 'id') user.userVerificationDetails.idDoc = '';
    else user.galleryPhoto = images;

    await Promise.all([deleteImagefromGCP(user.uuid, String(imageType), String(imageName)), user.save()]);
    successResponse(res, 200, { data: "Image Deleted Successfully" });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};



export const zodiacDetails = async (req: Request, res: Response) => {
  try {
    let zodicas = await ZodiacModel.find();
    successResponse(res, 200, { data: zodicas });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};

export const matchingProfiles = async (req: Request, res: Response) => {
  try {
    const { limit, skip, user } = res.locals;
    const { search, searchType } = req.query;
    let query: any = {};
    let filters: any = [];
    const regex = new RegExp(String(search), "i");
    // name: { $regex: '.*' + search + '.*' } }
    let count = 0;
    query.gender = user.gender == "Male" ? "Female" : "Male";
    if (!searchType) {
      if (user.partnerPreferences) {
        if (user.partnerPreferences.basicInformation) {
          // if (user.partnerPreferences.basicInformation.age) {
          //   query.$and = [{ 'generalDetails.height': { $gt: user.partnerPreferences.basicInformation.age.from, $lt: user.partnerPreferences.basicInformation.age.from } }];
          // }
          if (user.partnerPreferences.basicInformation.height) {
            filters.push({
              "basicDetails.height": {
                $gt: user.partnerPreferences.basicInformation.height.from || 18,
                $lt: user.partnerPreferences.basicInformation.height.to || 30,
              },
            });
          }
          if (user.partnerPreferences.basicInformation.martialStatus) {
            filters.push({
              "basicDetails.maritalStatus": {
                $in: user.partnerPreferences.basicInformation.martialStatus,
              },
            });
          }
          if (user.partnerPreferences.basicInformation.motherTongue) {
            filters.push({
              "religionDetails.motherTongue": {
                $in: user.partnerPreferences.basicInformation.motherTongue,
              },
            });
          }
          if (user.partnerPreferences.basicInformation.physicalStatus) {
            filters.push({
              "basicDetails.physicalStatus": {
                $in: user.partnerPreferences.basicInformation.physicalStatus,
              },
            });
          }
          if (user.partnerPreferences.basicInformation.dietHabit) {
            filters.push({
              "lifeStyleDetails.dietHabit": {
                $in: user.partnerPreferences.basicInformation.dietHabit,
              },
            });
          }
          if (user.partnerPreferences.basicInformation.smokingHabit) {
            filters.push({
              "lifeStyleDetails.smokingHabit":
                user.partnerPreferences.basicInformation.smokingHabit,
            });
          }
          if (user.partnerPreferences.basicInformation.drinkingHabit) {
            filters.push({
              "lifeStyleDetails.drinkingHabit":
                user.partnerPreferences.basicInformation.drinkingHabit,
            });
          }
        }

        // Religious Preference filters

        if (user.partnerPreferences.religiousPreferences) {
          if (user.partnerPreferences.religiousPreferences.religion) {
            filters.push({
              "religionDetails.religion": {
                $in: user.partnerPreferences.religiousPreferences.religion,
              },
            });
          }
          if (user.partnerPreferences.religiousPreferences.caste) {
            filters.push({
              "religionDetails.caste": {
                $in: user.partnerPreferences.religiousPreferences.caste,
              },
            });
          }
          // if (user.partnerPreferences.religiousPreferences.subCaste) {
          //   filters.push({
          //     "religionDetails.subCaste": {
          //       $in: user.partnerPreferences.religiousPreferences.subCaste,
          //     },
          //   });
          // }
          if (user.partnerPreferences.religiousPreferences.star) {
            filters.push({
              "religiousDetails.star": {
                $in: user.partnerPreferences.religiousPreferences.star,
              },
            });
          }
          if (user.partnerPreferences.religiousPreferences.dosham) {
            filters.push({
              "religiousDetails.dosham":
                user.partnerPreferences.religiousPreferences.dosham,
            });
          }
        }

        // Professional Preference
        if (user.partnerPreferences.professionalPreferences) {
          if (user.partnerPreferences.professionalPreferences.education) {
            filters.push({
              "careerDetails.education": {
                $in: user.partnerPreferences.professionalPreferences.education,
              },
            });
          }
          if (user.partnerPreferences.professionalPreferences.employedIn) {
            filters.push({
              "careerDetails.employedIn": {
                $in: user.partnerPreferences.professionalPreferences.employedIn,
              },
            });
          }
          if (user.partnerPreferences.professionalPreferences.occupation) {
            filters.push({
              "careerDetails.occupation": {
                $in: user.partnerPreferences.professionalPreferences.occupation,
              },
            });
          }

          // Location Preference

          if (user.partnerPreferences.locationPreferences) {
            if (user.partnerPreferences.locationPreferences.country) {
              filters.push({
                "locationDetails.country": {
                  $in: user.partnerPreferences.locationPreferences.country,
                },
              });
            }
            if (user.partnerPreferences.locationPreferences.city) {
              filters.push({
                "locationDetails.city": {
                  $in: user.partnerPreferences.locationPreferences.city,
                },
              });
            }
            if (user.partnerPreferences.locationPreferences.state) {
              filters.push({
                "locationDetails.state": {
                  $in: user.partnerPreferences.locationPreferences.state,
                },
              });
            }
          }
        }
      }
    }

    if (Array.isArray(filters) && filters.length !== 0) {
      query.$and = filters;
    }

    if (search) {
      query.$or = [
        { firstName: regex },
        { lastName: regex },
        { profileId: regex },
      ];
      count = await UserModel.countDocuments({ name: regex });
    } else {
      count = await UserModel.countDocuments();
    }
    let fields =
      "-_id firstName email lastName uuid profileId dateOfBirth age gender phoneNumber membership avatar basicDetails locationDetails religionDetails careerDetails";
    let profiles = await UserModel.find(query, fields, {
      skip: skip,
      limit: limit,
    });
    successResponse(res, 200, { count: count, data: profiles });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};

export const userProfile = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const { userId } = req.params;

    const userProfile = await UserModel.findOne({ uuid: userId }).select(
      "-_id -phoneNumber -email -phoneNumberCode -phoneNumberCodeExpireAt -resetPasswordToken -resetPasswordTokenExpireAt  -profileViewed -isPhoneNumberVerified -emailVerified -numOfLogins -numOfLogouts -lastLoginAt -lastLogoutAt"
    );

    if (!userProfile) {
      throw new Error("404:User not Found");
    }
    successResponse(res, 200, { userProfile });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};
//  view Matching profiles mobile number
export const viewPhoneNumber = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const { userId } = req.params;

    // ADD SETTING OPTION AND LOAD NUMBER DYNAMICALLY BASED UPON USER SUBSCRIPTION
    if (user.phoneNumberViewed.length >= 40) {
      throw new Error("422:You are out of limit");
    }

    if (user.uuid === userId) {
      throw new Error("500:Invalid Call, you cannot use your own id");
    }

    let u = await UserModel.findOne({ uuid: userId });
    if (!u) {
      throw new Error("404:User Not Found");
    }

    if (!user.phoneNumberViewed.includes(userId)) {
      user.phoneNumberViewed.push(userId);
      await user.save();
    }

    successResponse(res, 200, { data: u.phoneNumber });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};

//  profile ingore list
export const addToIgnoreList = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const { userId } = req.params;

    if (user.uuid === userId) {
      throw new Error("500:Invalid Call, you cannot use your own id");
    }

    let u = await UserModel.findOne({ uuid: userId });

    if (!u) {
      throw new Error("404:User Not Found");
    }

    if (!user.ignoredProfiles.includes(userId)) {
      user.ignoredProfiles.push(userId);
      await user.save();
    }

    successResponse(res, 200, { data: "User added to ignore list" });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};

//  add profile to favourte list
export const addToFavouriteList = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const { userId } = req.params;

    if (user.uuid === userId) {
      throw new Error("500:Invalid Call, you cannot use your own id");
    }

    let u = await UserModel.findOne({ uuid: userId });

    if (!u) {
      throw new Error("404:User Not Found");
    }

    if (!user.favouriteProfiles.includes(userId)) {
      user.favouriteProfiles.push(userId);
      await user.save();
    }

    if (!u.favouritedYourProfile?.includes(user.uuid)) {
      u.favouritedYourProfile?.push(user.uuid);
      await u.save();
    }
    successResponse(res, 200, { data: "User added to favourite list" });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};

export const profileViewed = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;
    const { userId } = req.params;

    if (user.uuid === userId) {
      throw new Error("500:Invalid Call, you cannot use your own id");
    }

    let u = await UserModel.findOne({ uuid: userId });

    if (!u) {
      throw new Error("404:User Not Found");
    }

    if (!user.profileViewed.includes(userId)) {
      user.profileViewed.push(userId);
      await user.save();
    }

    if (!u.viewedYourProfile?.includes(user.uuid)) {
      u.viewedYourProfile?.push(user.uuid);
      await u.save();
    }

    successResponse(res, 200, { data: "User added to viewed list" });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};

//  action counts like viewed profile,favourte profile ..etc
export const actionCounts = async (req: Request, res: Response) => {
  try {
    const { user } = res.locals;

    let yourFavourites = user.favouriteProfiles.length;
    let ignores = user.ignoredProfiles.length;
    let viewedYourProfile = user.viewedYourProfile.length;
    let favouritedYourProfile = user.favouritedYourProfile.length;
    successResponse(res, 200, {
      yourFavourites: yourFavourites,
      ignoreList: ignores,
      viewedYourProfile: viewedYourProfile,
      favouritedYourProfile: favouritedYourProfile,
    });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};

//  profile id verification API
export const idVerify = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    if (!uuid) {
      throw new Error("404:Uuid is required");
    }

    let user = await getUserByUuid(uuid);

    if (!user) {
      throw new Error("404:User not found");
    }

    if (user.idVerified === true) {
      throw new Error("422:User ID is already verified");
    }

    user.idVerified = true;
    await user.save();
    successResponse(res, 200, { data: "User Id successfully verified" });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};

//  send invite mail for admins
export const sendAdminInvite = async (req: Request, res: Response) => {
  try {
    const { email, role, phoneNumber } = req.body;
    // Validate the email and role parameters
    if (!email || !role) {
      return res.status(400).json({ error: "Email and role are required" });
    }

    // Check if the user with the given email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return successResponse(res, 200, { data: "User already exists" });
    }

    // Generate a unique token for the user invitation
    const invitationToken = generateUUID();

    // Compose the email message
    const mailOptions = {
      from: "arpit@aptonworks.com",
      to: email,
      subject: "Invitation to join our platform",
      body: `Hello,
      You have been invited to join our platform as a ${role}. Please click on the following link to complete your registration:
      https://royal-matrimoni-api-c5tbent7ka-el.a.run.app/user/accept_invitation?token=${invitationToken}

      Thank you!`,
    };

    // Save the user information to MongoDB and send the email in parallel
    await Promise.all([
      UserModel.create({
        email,
        password: await encryptPassword("Pass@1234"),
        role,
        profileId: generateProfileId(),
        uuid: invitationToken,
        phoneNumber
      }),
      sendEmail(email, mailOptions.from, mailOptions.subject, mailOptions.body),
    ]);

    successResponse(res, 200, { data: "Invitation email sent successfully" });
  } catch (error: any) {
    logger.error(error?.message);
    errorResponse(res, "Failed to send invitation email");
  }
};

// Accept Invitation and update the user status
export const acceptInvite = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;
    // Check if the user with the provided token and status 0 exists
    const userToUpdate = await UserModel.findOne({ uuid: token, status: 0 });

    if (!userToUpdate) {
      return errorResponse(res, "404: User not found or already completed the process");
    }
    const resetPasswordToken = random(18);

    const updateFields = {
      status: 1,
      resetPasswordToken,
      resetPasswordTokenExpireAt: new Date(Date.now() + 10 * 60 * 1000), // Expire in 10 minutes
      resetPassword: true
    };

    // Update user collection
    const user = await UserModel.findOneAndUpdate(
      { uuid: token, status: 0 },
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return errorResponse(res, "404: User not found");
    }

    const mailOptions = {
      from: "arpit@aptonworks.com",
      to: user?.email,
      subject: "Reset your password",
      body: `Hello,
      Please click on the following link to reset your password
      http://localhost:8080/user/accept_invitation?token=${resetPasswordToken}

      Thank you!`,
    };

    // Send the email if the user collection update is successful
    await sendEmail(user?.email, mailOptions.from, mailOptions.subject, mailOptions.body);
    successResponse(res, 200, { data: "Password reset mail shared with your registered email ID." });
  } catch (error: any) {
    logger.error(error?.message);
    errorResponse(res, "User already completed the process");
  }
};


// Update/edit user info
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { uuid } = req.params;
    const updateFields = { ...req.body };
    // Validate that at least one field is present in the updateFields object
    if (Object.keys(updateFields)?.length === 0) {
      return res.status(400).json({ error: 'At least one field is required for update' });
    }
    // Find the user by ID and update the specified fields
    const updatedUser = await UserModel.findOneAndUpdate({ uuid }, updateFields, { new: true });
    // If the user doesn't exist, return an error response
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    successResponse(res, 200, { data: "Profile updated sucessfully" })
  } catch (error: any) {
    logger.error(error?.message);
    errorResponse(res, 'Failed to edit user');
    // return res.status(500).json({ error: 'Failed to edit user' });
  }
};


// Generate PDF file
export const profilePDF = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const userProfile = await UserModel.findOne({ uuid: userId }).select(
      '-phoneNumberCodeExpireAt -resetPasswordToken -resetPasswordTokenExpireAt -partnerPreferences -profileViewed -isPhoneNumberVerified -emailVerified -numOfLogins -numOfLogouts -lastLoginAt -lastLogoutAt'
    );

    if (!userProfile) {
      throw new Error('404: User not found');
    }
    generateUserProfilePDF(res, userProfile);
    successResponse(res, 200, { data: "Bio data dowloaded sucessfully" })
  } catch (error: any) {
    console.error('Error generating profile PDF:', error);
    res.status(500).json({ error: 'Failed to generate profile PDF' });
  }
};

// Get storied image url
export const getStoriesImageUrl = async (req: Request, res: Response) => {
  try {
    const { fileType } = req.query;

    if (!fileType) {
      return res.status(404).json({ error: 'Param fileType not found.Ex:image/png' });
    }
    const url = await generateV4UploadStoriesUrl(String(fileType));
    successResponse(res, 200, {
      url: url[0],
    });
  } catch (error: any) {
    logger.error(error?.message);
    return errorResponse(res, String(error));
  }
};


// forgotPassword
export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    // Check if the user with the provided token and status 0 exists
    const userToUpdate = await UserModel.findOne({ email: email, status: 1 });

    if (!userToUpdate) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const resetPasswordToken = random(18);

    const updateFields = {
      resetPasswordToken,
      resetPasswordTokenExpireAt: new Date(Date.now() + 10 * 60 * 1000), // Expire in 10 minutes
      resetPassword: true
    };

    // Update user collection
    const user = await UserModel.findOneAndUpdate(
      { email: email, status: 1 },
      { $set: updateFields },
      { new: true }
    );

    if (!user) {
      return errorResponse(res, "404: User not found");
    }

    const mailOptions = {
      from: "arpit@aptonworks.com",
      to: user?.email,
      subject: "Reset your password",
      body: `Hello,
      Please click on the following link to reset your password
      http://localhost:8080/user/accept_invitation?token=${resetPasswordToken}

      Thank you!`,
    };

    // Send the email if the user collection update is successful
    await sendEmail(user?.email, mailOptions.from, mailOptions.subject, mailOptions.body);
    successResponse(res, 200, { data: "Password reset mail shared with your registered email ID." });
  } catch (error: any) {
    logger.error(error?.message);
    errorResponse(res, "User already completed the process");
  }
};
export const getAllUserUuid = async (req : Request ,res : Response) =>{
    try {
        if(!req.body || !req.body.uuid || (req.body.uuid.length && req.body.uuid.length==0)){      
            return res.status(404).json({ error: 'Uuid is required' });
        }
        const users = await getUserAllByUuid(req.body.uuid);
        successResponse(res, 200, {
          data: users,
        });
    } catch (error : any) {
        return res.status(404).json({ error: 'Uuid is required' });
    }


}

export const getRecentUserData = async (req : Request , res : Response) => {
    try{
      const users = await getRecentUser();
      successResponse(res, 200, {
        data: users,
      });
    }
    catch(error:any){      
      return res.status(404).json({ error: 'Recent user data not found' });
    }
      
}

export const getRandomUserData = async (req : Request , res : Response) => {
  try{
    const users = await getRandomUsers();
    successResponse(res, 200, {
      data: users,
    });
  }
  catch(error:any){      
    return res.status(404).json({ error: 'User data not found' });
  }
    
}


