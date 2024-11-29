import express from 'express';
import asyncHandler from 'express-async-handler';
import { FuelService } from '../services/fuelService.js';

const router = express.Router();
const fuelService = new FuelService();

// Get all fuel types
router.get('/', asyncHandler(async (req, res) => {
  const fuels = await fuelService.getAllFuels();
  res.json(fuels);
}));

// Add new fuel type
router.post('/', asyncHandler(async (req, res) => {
  const { fuelType, pricePerLiter, currentStock } = req.body;
  const newFuel = await fuelService.addFuel(fuelType, pricePerLiter, currentStock);
  res.status(201).json(newFuel);
}));

// Update fuel stock
router.patch('/:id/stock', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { newStock } = req.body;
  const updatedFuel = await fuelService.updateStock(id, newStock);
  res.json(updatedFuel);
}));

export { router };