import { Request, Response, NextFunction } from "express";
import { SubscriptionPlanModel } from "../models/subscriptionPlan";
import logger from "../library/logger";
import { errorResponse, generateUUID, successResponse } from '../helpers';


// fetch all plan details
export const subscriptionPlans = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { status } = req.query;
        // Construct the filter object based on the status query parameter
        const filter: any = {};
        if (status) {
            filter.status = status;
        }
        // Fetch subscription plans with the status filter
        const plans = await SubscriptionPlanModel.find(filter).lean().exec();
        // Count the number of documents in the collection with the status filter
        const planCount = await SubscriptionPlanModel.countDocuments(filter);
        const transformedPlans = plans.map((plan) => {
            return {
                id: plan._id,
                uuid: plan.uuid,
                name: plan.name,
                price: parseFloat(plan.price.toString()),
                features: plan.features,
                durationInMonths: plan.durationInMonths,
                contactLimit: plan.contactLimit,
                status: plan.status,
                chatOption: plan.chatOption,
                horoscopeOption: plan.horoscopeOption,
            };
        });
        successResponse(res, 200, { data: transformedPlans, count: planCount });
    } catch (error: any) {
        logger.error(error.message);
        return errorResponse(res, String(error));
    }
};

//   create new plan
export const createSubscriptionPlan = async (req: Request, res: Response) => {
    try {
        const { name, price, features, durationInMonths, contactLimit, chatOption, horoscopeOption } = req.body;
        // Validate required parameters
        if (!name || !price || !features || !durationInMonths || !contactLimit || !chatOption ||
            !horoscopeOption) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }
        // Validate parameter types
        if (typeof name !== 'string' || typeof price !== 'number' || !Array.isArray(features)) {
            return res.status(400).json({ error: 'Invalid parameter types' });
        }
        // Create a new SubscriptionPlan document
        const newPlan = new SubscriptionPlanModel({
            uuid: generateUUID(),
            name,
            price,
            features,
            durationInMonths,
            contactLimit,
            chatOption,
            horoscopeOption
        });
        // Save the new plan to the database
        const createdPlan = await newPlan.save();
        successResponse(res, 200, { data: "New Plan added successfully" });
    } catch (error: any) {
        logger.error(error.message);
        return errorResponse(res, String(error));
    }
};

//   update the plan details
export const updateSubscriptionPlan = async (req: Request, res: Response) => {
    try {
      const { uuid } = req.params;
      const updateFields = req.body;
      // Validate request body parameters
      if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({ error: 'No update fields provided' });
      }
      // Find the subscription plan by UUID and update the fields
      const updatedPlan = await SubscriptionPlanModel.findOneAndUpdate(
        { uuid },
        updateFields,
        { new: true }
      );
  
      // Check if the subscription plan exists
      if (!updatedPlan) {
        return res.status(404).json({ error: 'Subscription plan not found' });
      }
     successResponse(res,200,{data: updatedPlan ,message:'plan details are updated' })
    } catch (error: any) {
      logger.error('Error updating subscription plan:', error);
      res.status(500).json({ error: 'Failed to update subscription plan' });
    }
  };
  
  
  
