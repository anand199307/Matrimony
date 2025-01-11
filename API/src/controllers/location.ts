import { Request, Response, NextFunction } from 'express';
import logger from '../library/logger';
import { errorResponse, successResponse } from '../helpers';
import { CountryModel } from '../models/country';
import { StateModel } from '../models/state';
import { CityModel } from '../models/city';

export const country = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let country = await CountryModel.findOne({ code: 'IN' }).select('-_id name code lat long region currency currencySymbol phoneCode externalId uuid');
    successResponse(res, 200, { country });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};

export const states = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, skip } = res.locals;
    const { search } = req.query;
    const { countryId } = req.params;
    let query: any = { countryId: countryId };
    const regex = new RegExp(String(search), 'i');
    // name: { $regex: '.*' + search + '.*' } }
    let count = 0;
    if (search) {
      query.name = regex;
      count = await StateModel.countDocuments({ name: regex });
    } else {
      count = await StateModel.countDocuments();
    }
    let fields = '-_id name code uuid countryId externalId lat long';

    let states = await StateModel.find(query, fields, { skip: skip, limit: limit });
    successResponse(res, 200, { count: count, data: states });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};

export const cities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { stateId } = req.params;
    const { limit, skip } = res.locals;
    const { search } = req.query;
    let query: any = { stateId: stateId };
    const regex = new RegExp(String(search), 'i');
    let count = 0;
    if (search) {
      query.name = regex;
      count = await CityModel.countDocuments({ stateId: stateId, name: regex });
    } else {
      count = await CityModel.countDocuments({ stateId: stateId });
    }
    let fields = '-_id name code uuid stateId externalId lat long';

    let states = await CityModel.find(query, fields, { skip: skip, limit: limit });
    successResponse(res, 200, { count: count, data: states });
  } catch (error: any) {
    logger.error(error.message);
    return errorResponse(res, String(error));
  }
};
