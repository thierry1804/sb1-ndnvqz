import express from 'express';
import asyncHandler from 'express-async-handler';
import { EmployeeService } from '../services/employeeService.js';

const router = express.Router();
const employeeService = new EmployeeService();

// Get all employees
router.get('/', asyncHandler(async (req, res) => {
  const employees = await employeeService.getAllEmployees();
  res.json(employees);
}));

// Add new employee
router.post('/', asyncHandler(async (req, res) => {
  const { name, position } = req.body;
  const employee = await employeeService.addEmployee(name, position);
  res.status(201).json(employee);
}));

export { router };