import { Request, Response, NextFunction } from 'express';
import logger from '../library/logger';
import { SiteControllModel } from "../models/siteControll";

// Get all siteControll documents
export const getSiteControll = async (req: Request, res: Response) => {
    try {
        const siteControlls = await SiteControllModel.find().select('-createdAt -updatedAt');
        res.json(siteControlls);
    } catch (error) {
        logger.error(error)
        res.status(500).json({ error: 'Something went wrong' });
    }
}
// Update an object within the siteControll document
export const updateSiteDetails = async (req: Request, res: Response) => {
    try {
        const siteControll = await SiteControllModel.findById(req.params.id);
        if (!siteControll) {

            return res.status(404).json({ error: 'SiteControll not found' });
        }
        if (!req.body.objectType || !req.body.action) {
            return res.status(404).json({ error: 'Required values are not passed' });
        }
        const objectType = req.body.objectType.toLowerCase();
        const allowedObjectTypes = ['stories', 'faq'];
        if (!allowedObjectTypes.includes(objectType)) {
            return res.status(400).json({ error: 'Invalid object type' });
        }
        const objectToUpdate = (siteControll as any)[objectType];
        if (!objectToUpdate) {
            return res.status(404).json({ error: 'Object not found' });
        }

        // Check if the user wants to add or delete an item
        if (req.body.action === 'add') {
            // Add a new item to the object array
            objectToUpdate.push(req.body.item);
        } else if (req.body.action === 'delete') {
            // Delete an item from the object array by ID
            const itemId = req.body.itemId;
            const indexToDelete = objectToUpdate.findIndex((item: any) => item.id === itemId);
            if (indexToDelete !== -1) {
                objectToUpdate.splice(indexToDelete, 1);
            } else {
                return res.status(404).json({ error: 'Item not found' });
            }
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }
        await siteControll.save();
        return res.status(200).json({ message: 'Changes are updated sucessfully' });
    } catch (error) {
        logger.error(error)
        res.status(500).json({ error: 'Something went wrong' });
    }
}

