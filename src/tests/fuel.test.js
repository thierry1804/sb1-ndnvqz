import { expect, test, beforeEach } from 'vitest';
import { FuelService } from '../services/fuelService.js';
import { initializeDatabase } from '../database/init.js';

let db;
let fuelService;

beforeEach(async () => {
  db = await initializeDatabase();
  await db.run('DELETE FROM fuel_inventory');
  fuelService = new FuelService();
});

test('should add new fuel type', async () => {
  const fuel = await fuelService.addFuel('Unleaded', 1.5, 1000);
  
  expect(fuel.fuelType).toBe('Unleaded');
  expect(fuel.pricePerLiter).toBe(1.5);
  expect(fuel.currentStock).toBe(1000);
});

test('should update fuel stock', async () => {
  const fuel = await fuelService.addFuel('Diesel', 1.6, 2000);
  const updated = await fuelService.updateStock(fuel.id, 1500);
  
  expect(updated.current_stock).toBe(1500);
});