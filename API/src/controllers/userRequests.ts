import { Request, Response } from 'express';
import { UserRequestModal } from '../models/userRequests';
import { random, successResponse, errorResponse,generateRandomDigitNumber } from '../helpers';
import logger from "../library/logger";
import { UserModel } from '../models/user';

export const createRequest = async (req: Request, res: Response) => {
  try {
    const { user, reasons, requestType } = req.body;
    // Create a new UserRequest document
    if (!user || !requestType) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    await Promise.all([UserRequestModal.create({
      requestId:generateRandomDigitNumber(6),
      user,
      reasons,
      requestType
    })]);
    successResponse(res, 200, { data: "Your request added successfully" });
  } catch (error: any) {
    logger.error(error?.message);
    errorResponse(res, "Failed to add your request");
  }
};

//  fetch all user details and request details which is releated to users

export const getAllUsersWithRequests = async (req: Request, res: Response) => {
  try {
    const { verificationStatus, requestType, search } = req.query;

    // Construct the filter object based on the query parameters
    const filter: any = {};
    if (verificationStatus) {
      filter.verificationStatus = verificationStatus;
    }
    if (requestType) {
      filter.requestType = requestType;
    }

    // Construct the search query
    const searchQuery = search ? { requestId: search } : {};

    // Merge the filter and search query
    const query = { ...filter, ...searchQuery };

    // Find user requests with the specified filters and search query
    // 
    const userRequests = await UserRequestModal.find(query)
      .populate({ path: 'user', select: 'email profileId uuid dateOfBirth ', match: { status: 1 } })
      .lean()
      .exec();

    // Filter out the documents where the user field is null
    const filteredUserRequests = userRequests.filter((userRequest: any) => userRequest.user !== null);
    res.json({ data: filteredUserRequests , count:filteredUserRequests.length });
  } catch (error: any) {
    logger.error(error?.message);
    res.status(500).json({ error: 'Failed to fetch user requests' });
  }
};

//  update request status
export const updateVerificationStatus = async (req: Request, res: Response) => {
  try {
    const { requestId, verificationStatus, reasons } = req.body;
    // Validate the request body parameters
    if (!requestId || !verificationStatus) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // If verificationStatus is "rejected", validate the reasons field
    if (verificationStatus === 'rejected' && !reasons) {
      return res.status(400).json({ error: 'Reasons field is required' });
    }

    // Update the verificationStatus and reasons in the UserRequests collection
    const updatedUserRequest = await UserRequestModal.findOneAndUpdate(
      { requestId },
      { verificationStatus, reasons },
      { new: true }
    );

    // Update the idverification status in the User collection based on the user reference ID
    const userRequest = await UserRequestModal.findOne({ requestId });
    if (!userRequest) {
      return res.status(404).json({ error: 'UserRequest not found' });
    }
    const user = await UserModel.findById(userRequest.user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.idVerified = verificationStatus==='approved'?true:false;
    await user.save();
    res.json({ message: 'Verification status updated successfully', data: updatedUserRequest });
  } catch (error: any) {
    logger.error(error?.message);
    res.status(500).json({ error: 'Failed to update verification status' });
  }
};





