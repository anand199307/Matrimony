import { Request, Response, NextFunction } from 'express';
import logger from '../library/logger';
import { errorResponse, successResponse, getStartDate } from '../helpers';
import { MothertonguesModel } from '../models/motherTongues';
import { ReligiousModel, CasteModal } from '../models/religious';
import { EducationModel } from '../models/education';
import { DhosamModal } from '../models/dhosams';
import { UserModel } from '../models/user';
import moment from 'moment';
import { ProfessionsModel } from '../models/professions';

//  fetch all mothertoungues list 
export const getMotherTongues = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, skip } = res.locals;
    const { search } = req.query;
    const query = search ? { name: new RegExp(String(search), 'i') } : {};
    const [count, data] = await Promise.all([
      MothertonguesModel.countDocuments(query),
      MothertonguesModel.find(query, 'id name uuid').skip(skip).limit(limit)
    ]);
    successResponse(res, 200, { count, data });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};

// fetch religoius list
export const getReligious = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, skip } = res.locals;
    const { search } = req.query;
    const query = search ? { name: new RegExp(String(search), 'i') } : {};
    const [count, data] = await Promise.all([
      ReligiousModel.countDocuments(query),
      ReligiousModel.find(query, '-_id id name uuid').skip(skip).limit(limit)
    ]);
    successResponse(res, 200, { count, data });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};
//  fetch cast list
export const getCast = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, skip } = res.locals;
    const { search } = req.query;
    const query = search ? { name: new RegExp(String(search), 'i') } : {};
    const [count, data] = await Promise.all([
      CasteModal.countDocuments(query),
      CasteModal.find(query, '-_id id name uuid').skip(skip).limit(limit)
    ]);
    successResponse(res, 200, { count, data });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};
// fetch education details
export const getEducationDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, skip } = res.locals;
    const { search } = req.query;
    const query: any = {};
    if (search) {
      const searchRegex = new RegExp(String(search), 'i');
      query.$or = [
        { 'departmentDetails.short_name': searchRegex },
        { department: searchRegex },
        { uuid: searchRegex },
        { 'departmentDetails.full_name': searchRegex }
      ];
    }
    const [count, data] = await Promise.all([
      EducationModel.countDocuments(query),
      EducationModel.find(query, ' uuid department  departmentDetails').skip(skip).limit(limit)
    ]);
    successResponse(res, 200, { count, data });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};

//  fetch dhosam list
export const getDhosamList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, skip } = res.locals;
    const { search } = req.query;
    const query = search ? { name: new RegExp(String(search), 'i') } : {};
    const [count, data] = await Promise.all([
      DhosamModal.countDocuments(query),
      DhosamModal.find(query, '-_id uuid name').skip(skip).limit(limit)
    ]);
    successResponse(res, 200, { count, data });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
}

// Get the percentage of each religion based on the time range
export const getReligiousPercentage = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;

    // Get the start date based on the filter
    const startDate = getStartDate(filter as string);

    // Aggregate religion details based on the time range
    const religionDetails = await UserModel.aggregate([
      { $match: { createdAt: { $gte: startDate }, 'religionDetails.religion': { $ne: null } } },
      { $group: { _id: '$religionDetails.religion', count: { $sum: 1 } } },
      { $project: { religion: '$_id', percentage: { $multiply: [{ $divide: ['$count', 10] }, 100] }, _id: 0 } },
    ]);
    res.json(religionDetails);
  } catch (error) {
    console.error('Error fetching religious details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//  Get gender-wise counts and total user count based on the time range

export const getUsersCount = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;

    // Get the start date based on the filter
    const startDate = getStartDate(filter as string);

    // Match condition to exclude admin and superadmin users
    const matchCondition = { createdAt: { $gte: startDate }, role: { $nin: ['admin', 'superadmin'] } };

    // Aggregate gender-wise counts and total user count based on the time range
    const userStats = await UserModel.aggregate([
      { $match: matchCondition },
      { $group: { _id: '$gender', count: { $sum: 1 } } },
      { $project: { gender: '$_id', count: 1, _id: 0 } },
    ]);

    // Get the total user count excluding admin and superadmin users
    const totalUserCount = await UserModel.countDocuments(matchCondition);

    // Get the user count where the user status is 0
    const bolckedUsers = await UserModel.countDocuments({ ...matchCondition, status: 0 });

    res.json({ userStats, totalUserCount, bolckedUsers });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function getDayOfWeekAsString(date: Date) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}

// weekly report
export const weeklyReport = async (req: Request, res: Response) => {
  try {
    // Calculate the start and end date of the last one week
    const endDate = new Date(); // Current date and time
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    // Set the query to find users created in the last one week
    const query = {
      createdAt: { $gte: startDate, $lte: endDate }
    };

    // Fetch user count gender-wise for each day in the last one week
    const result = await UserModel.aggregate([
      {
        $match: query
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
            day: { $dayOfMonth: '$createdAt' },
            gender: { $ifNull: ['$gender', 'Unknown'] } // Handle null gender with 'Unknown'
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          day: '$_id.day',
          gender: '$_id.gender',
          count: 1
        }
      }
    ]);

    // Process the result to group by day and format the output
    const userCountByDay: { [x: string]: any }[] = [];
    result.forEach(item => {
      const { year, month, day, gender, count } = item;
      const dateStr = `${year}-${month}-${day}`;
      const dayOfWeekStr = getDayOfWeekAsString(new Date(dateStr));

      // Check if an entry already exists for the date
      const existingEntryIndex = userCountByDay.findIndex(entry => entry.date === dateStr);

      if (existingEntryIndex >= 0) {
        userCountByDay[existingEntryIndex][gender.toLowerCase()] = count;
      } else {
        const entry = {
          date: dateStr,
          male: 0, // Default value of 0 for male count
          female: 0, // Default value of 0 for female count
          [gender.toLowerCase()]: count,
          day: dayOfWeekStr
        };
        userCountByDay.push(entry);
      }
    });

    // Sort the data by date in ascending order
    userCountByDay.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Generate the full week's report with counts for each day (Sun to Sat)
    const weekReport: { [x: string]: any }[] = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(endDate.getDate() - 6 + i);
      const currentDayStr = getDayOfWeekAsString(currentDate);

      const existingEntry = userCountByDay.find(entry => entry.day === currentDayStr);
      if (existingEntry) {
        weekReport.push(existingEntry);
      } else {
        const dateStr = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        const entry = {
          date: dateStr,
          male: 0, // Default value of 0 for male count
          female: 0, // Default value of 0 for female count
          day: currentDayStr
        };
        weekReport.push(entry);
      }
    }
    return weekReport;
  } catch (error) {
    console.error('Error fetching user count:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

//  monthly report
export const monthlyReport = async (req: Request, res: Response) => {
  try {
    const { year, month } = req.query;
    if (!year || !month) {
      return res.status(400).json({ error: 'Year and month parameters are required.' });
    }

    const startOfMonth = moment(`${year}-${month}`, 'YYYY-MM').startOf('month');
    const endOfMonth = moment(`${year}-${month}`, 'YYYY-MM').endOf('month');

    // Generate the entire month's date range
    const dateRange = [];
    const currentDate = startOfMonth.clone();
    while (currentDate.isSameOrBefore(endOfMonth, 'day')) {
      dateRange.push(currentDate.format('DD-MM-YYYY'));
      currentDate.add(1, 'day');
    }

    const dailyUserCount = await UserModel.aggregate([
      {
        $match: {
          role: { $nin: ['admin', 'superadmin'] },
          createdAt: { $gte: startOfMonth.toDate(), $lte: endOfMonth.toDate() },
        },
      },
      {
        $project: {
          day: { $dateToString: { format: '%d-%m-%Y', date: '$createdAt' } }, // Format date as "day-month-year"
          gender: { $toLower: '$gender' },
        },
      },
      {
        $group: {
          _id: {
            day: '$day',
            gender: '$gender',
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.day',
          day: { $first: '$_id.day' },
          data: {
            $push: {
              k: '$_id.gender',
              v: '$count',
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          day: 1,
          data: {
            $arrayToObject: '$data',
          },
        },
      },
      {
        $sort: {
          day: 1,
        },
      },
    ]);

    // Left join the entire month's date range with the actual data and aggregate into 7-day intervals
    const weeklyUserCount = [];
    let weeklyData = { male: 0, female: 0 };
    for (let i = 0; i < dateRange.length; i++) {
      const date = dateRange[i];
      const existingData = dailyUserCount.find((item) => item.day === date);
      if (existingData) {
        weeklyData.male += existingData.data.male;
        weeklyData.female += existingData.data.female;
      }

      if ((i + 1) % 7 === 0 || i === dateRange.length - 1) {
        weeklyUserCount.push({
          day: dateRange[i - 6] + ' to ' + date,
          data: { ...weeklyData },
        });
        weeklyData = { male: 0, female: 0 };
      }
    }

    return weeklyUserCount;
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

//  yearly user count
export const yearlyReport = async (req: Request, res: Response) => {
  try {
    const currentMonth = moment().month() + 1; // Get the current month (1 for January, 2 for February, and so on)
    const startDate = moment().startOf('year'); // Get the start date of the current year
    const endDate = moment().endOf('month'); // Get the end date of the last completed month

    // Find all users with role type "user" added within the current year and group them by gender and month
    const report = await UserModel.aggregate([
      {
        $match: {
          role: { $nin: ['admin', 'superadmin'] }, // Only consider records with role type "user"
          createdAt: { $gte: startDate.toDate(), $lte: endDate.toDate() }
        }
      },
      {
        $group: {
          _id: {
            gender: '$gender',
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    // Create the response in the required format with month names
    const monthlyCounts = Array.from({ length: currentMonth }, (_, i) => ({
      month: moment().month(i).format('MMMM'), // Get the month name using moment formatting
      Male: 0,
      Female: 0
    }));

    report.forEach(item => {
      const index = item._id.month - 1; // Get the index of the month
      if (item._id.gender === 'Male') {
        monthlyCounts[index].Male = item.count;
      } else if (item._id.gender === 'Female') {
        monthlyCounts[index].Female = item.count;
      }
    });
    return monthlyCounts
  } catch (err) {
    console.error('Error while fetching the report:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const getUsersCountChartData = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
    // Check for required parameters
    if (!filter) {
      return res.status(400).json({ error: 'Required parameters were not met. Please provide the "reportType" parameter.' });
    }
    switch (filter) {
      case 'week':
        const response = await weeklyReport(req, res);
        res.json(response);
        break;
      case 'month':
        const monthlyData = await monthlyReport(req, res);
        res.json(monthlyData);
        break;
      case 'year':
        const yearlyData = await yearlyReport(req, res);
        res.json(yearlyData);
        break;
      default:
        return res.status(400).json({ error: 'Invalid report type. Supported types: week, month, year.' });
    }
  } catch (error: any) {
    logger.error(error);
    return res.status(500).json({ error: 'Failed to send notification' });
  }
};

//  fetch all professions list 
export const getProfessions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, skip } = res.locals;
    const { search } = req.query;
    const query = search ? { name: new RegExp(String(search), 'i') } : {};
    const [count, data] = await Promise.all([
      ProfessionsModel.countDocuments(query),
      ProfessionsModel.find(query, 'uuid name').skip(skip).limit(limit)
    ]);
    successResponse(res, 200, { count, data });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};