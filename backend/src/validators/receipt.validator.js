import { body } from 'express-validator';

export const validateReceipt = [
  body('storeName')
    .trim()
    .notEmpty()
    .withMessage('Store name is required')
    .isLength({ max: 100 })
    .withMessage('Store name must be less than 100 characters'),
    
  body('totalAmount')
    .isFloat({ min: 0 })
    .withMessage('Total amount must be a positive number'),
    
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isLength({ max: 50 })
    .withMessage('Category must be less than 50 characters'),
    
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL')
];