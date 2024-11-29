import { db } from '../database/init.js';

export class FuelService {
  async getAllFuels() {
    return await db.all('SELECT * FROM fuel_inventory');
  }

  async addFuel(fuelType, pricePerLiter, currentStock) {
    const result = await db.run(`
      INSERT INTO fuel_inventory (fuel_type, price_per_liter, current_stock)
      VALUES (?, ?, ?)
    `, [fuelType, pricePerLiter, currentStock]);
    
    return { 
      id: result.lastID, 
      fuelType, 
      pricePerLiter, 
      currentStock 
    };
  }

  async updateStock(id, newStock) {
    await db.run(`
      UPDATE fuel_inventory
      SET current_stock = ?, last_updated = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [newStock, id]);
    
    return this.getFuelById(id);
  }

  async getFuelById(id) {
    return await db.get('SELECT * FROM fuel_inventory WHERE id = ?', [id]);
  }
}