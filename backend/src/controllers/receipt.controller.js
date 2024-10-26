import { AppError } from '../middleware/error.js';
import * as receiptService from '../services/receipt.service.js';
import logger from '../utils/logger.js';

export const getReceipts = async (req, res, next) => {
  try {
    const receipts = await receiptService.getAllReceipts(req.user.id);
    res.json({ status: 'success', data: receipts });
  } catch (error) {
    next(error);
  }
};

export const getReceipt = async (req, res, next) => {
  try {
    const receipt = await receiptService.getReceiptById(req.params.id, req.user.id);
    if (!receipt) {
      throw new AppError('Receipt not found', 404);
    }
    res.json({ status: 'success', data: receipt });
  } catch (error) {
    next(error);
  }
};

export const createReceipt = async (req, res, next) => {
  try {
    const receipt = await receiptService.createReceipt({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json({ status: 'success', data: receipt });
  } catch (error) {
    next(error);
  }
};

export const updateReceipt = async (req, res, next) => {
  try {
    const receipt = await receiptService.updateReceipt(
      req.params.id,
      req.body,
      req.user.id
    );
    if (!receipt) {
      throw new AppError('Receipt not found', 404);
    }
    res.json({ status: 'success', data: receipt });
  } catch (error) {
    next(error);
  }
};

export const deleteReceipt = async (req, res, next) => {
  try {
    await receiptService.deleteReceipt(req.params.id, req.user.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    next(error);
  }
};