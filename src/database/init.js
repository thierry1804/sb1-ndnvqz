import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db;

export async function initializeDatabase() {
  db = await open({
    filename: 'gas_station.db',
    driver: sqlite3.Database
  });

  // Fuel inventory table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS fuel_inventory (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fuel_type TEXT NOT NULL,
      price_per_liter REAL NOT NULL,
      current_stock REAL NOT NULL,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Sales table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fuel_type TEXT NOT NULL,
      liters REAL NOT NULL,
      total_amount REAL NOT NULL,
      employee_id INTEGER,
      sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (employee_id) REFERENCES employees(id)
    )
  `);

  // Employees table
  await db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      position TEXT NOT NULL,
      hire_date DATE NOT NULL,
      active BOOLEAN DEFAULT true
    )
  `);

  return db;
}

export { db };