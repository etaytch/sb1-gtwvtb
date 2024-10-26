import pool from '../config/database.js';
import { AppError } from '../middleware/error.js';
import logger from '../utils/logger.js';

export const getAllReceipts = async (userId) => {
  const [rows] = await pool.query(
    'SELECT * FROM receipts WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );
  return rows;
};

export const getReceiptById = async (id, userId) => {
  const [rows] = await pool.query(
    'SELECT * FROM receipts WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  return rows[0];
};

export const createReceipt = async (receiptData) => {
  const { userId, storeName, totalAmount, category, imageUrl } = receiptData;
  
  const [result] = await pool.query(
    `INSERT INTO receipts (user_id, store_name, total_amount, category, image_url)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, storeName, totalAmount, category, imageUrl]
  );
  
  return getReceiptById(result.insertId, userId);
};

export const updateReceipt = async (id, receiptData, userId) => {
  const { storeName, totalAmount, category, imageUrl } = receiptData;
  
  const [result] = await pool.query(
    `UPDATE receipts 
     SET store_name = ?, total_amount = ?, category = ?, image_url = ?
     WHERE id = ? AND user_id = ?`,
    [storeName, totalAmount, category, imageUrl, id, userId]
  );
  
  if (result.affectedRows === 0) {
    throw new AppError('Receipt not found', 404);
  }
  
  return getReceiptById(id, userId);
};

export const deleteReceipt = async (id, userId) => {
  const [result] = await pool.query(
    'DELETE FROM receipts WHERE id = ? AND user_id = ?',
    [id, userId]
  );
  
  if (result.affectedRows === 0) {
    throw new AppError('Receipt not found', 404);
  }
};