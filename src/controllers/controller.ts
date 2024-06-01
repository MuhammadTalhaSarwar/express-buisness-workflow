import { Request, Response } from 'express';
import { Business, businesses } from '../models/model';

export const createBusiness = (req: Request, res: Response): void => {
    const { fein, name } = req.body;
    if (!fein || !name) {
        res.status(400).json({ message: 'FEIN and Name are required' });
        return;
    }
    const business = new Business(fein, name);
    businesses.push(business);
    res.status(201).json({
        business,
        nextStep: 'Provide industry to progress from "New" stage. Supported industries: restaurants, stores.'
    });
};

export const updateBusiness = (req: Request, res: Response): void => {
    const { fein } = req.params;
    const business = businesses.find(b => b.fein === fein);

    if (!business) {
        res.status(404).json({ message: 'Business not found' });
        return;
    }

    const { industry, contact, status } = req.body;
    let nextStep = 'No further steps available.';

    if (industry) business.industry = industry;
    if (contact) business.contact = contact;

    // Workflow logic
    if (business.status === 'New' && business.industry) {
        if (['restaurants', 'stores'].includes(business.industry)) {
            business.status = 'Market Approved';
            nextStep = 'Provide contact information to progress from "Market Approved" stage.';
        } else {
            business.status = 'Market Declined';
        }
    } else if (business.status === 'Market Approved' && business.contact) {
        if (business.contact.name && business.contact.phone) {
            business.status = 'Sales Approved';
            nextStep = 'Business can now be marked as "Won" or "Lost".';
        }
    } else if (business.status === 'Sales Approved' && status) {
        if (['Won', 'Lost'].includes(status)) {
            business.status = status;
            nextStep = 'No further steps available.';
        }
    } else {
        if (business.status === 'New') {
            nextStep = 'Provide industry to progress from "New" stage. Supported industries: restaurants, stores.';
        } else if (business.status === 'Market Approved') {
            nextStep = 'Provide contact information to progress from "Market Approved" stage.';
        } else if (business.status === 'Sales Approved') {
            nextStep = 'Business can now be marked as "Won" or "Lost".';
        }
    }

    res.json({
        business,
        nextStep
    });
};
