import express from 'express';
import asyncHandler from 'express-async-handler';
import { SalesService } from '../services/salesService.js';

const router = express.Router();
const salesService = new SalesService();

// Record new sale
router.post('/', asyncHandler(async (req, res) => {
  const { fuelType, liters, employeeId } = req.body;
  const sale = await salesService.recordSale(fuelType, liters, employeeId);
  res.status(201).json(sale);
}));

// Get daily sales report
router.get('/daily-report', asyncHandler(async (req, res) => {
  const { date } = req.query;
  const report = await salesService.getDailyReport(date);
  res.json(report);
}));

export { router };