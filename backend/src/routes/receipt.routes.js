import express from 'express';
import { protect } from '../middleware/auth.js';
import * as receiptController from '../controllers/receipt.controller.js';
import { validateReceipt } from '../validators/receipt.validator.js';

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(receiptController.getReceipts)
  .post(validateReceipt, receiptController.createReceipt);

router
  .route('/:id')
  .get(receiptController.getReceipt)
  .put(validateReceipt, receiptController.updateReceipt)
  .delete(receiptController.deleteReceipt);

export default router;