import { db } from '../database/init.js';

export class EmployeeService {
  async getAllEmployees() {
    return await db.all('SELECT * FROM employees WHERE active = true');
  }

  async addEmployee(name, position) {
    const result = await db.run(`
      INSERT INTO employees (name, position, hire_date)
      VALUES (?, ?, DATE('now'))
    `, [name, position]);
    
    return { 
      id: result.lastID, 
      name, 
      position 
    };
  }

  async getEmployeeById(id) {
    return await db.get('SELECT * FROM employees WHERE id = ?', [id]);
  }
}