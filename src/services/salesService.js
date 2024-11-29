import { db } from '../database/init.js';

export class SalesService {
  async recordSale(fuelType, liters, employeeId) {
    const fuelInfo = await db.get(
      'SELECT price_per_liter FROM fuel_inventory WHERE fuel_type = ?', 
      [fuelType]
    );
    const totalAmount = liters * fuelInfo.price_per_liter;

    const result = await db.run(`
      INSERT INTO sales (fuel_type, liters, total_amount, employee_id)
      VALUES (?, ?, ?, ?)
    `, [fuelType, liters, totalAmount, employeeId]);
    
    return { 
      id: result.lastID, 
      fuelType, 
      liters, 
      totalAmount, 
      employeeId 
    };
  }

  async getDailyReport(date) {
    return await db.all(`
      SELECT 
        fuel_type,
        SUM(liters) as total_liters,
        SUM(total_amount) as total_revenue,
        COUNT(*) as transaction_count
      FROM sales
      WHERE DATE(sale_date) = DATE(?)
      GROUP BY fuel_type
    `, [date]);
  }
}