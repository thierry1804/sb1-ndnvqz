import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { router as fuelRouter } from './routes/fuel.js';
import { router as salesRouter } from './routes/sales.js';
import { router as employeeRouter } from './routes/employees.js';
import { initializeDatabase } from './database/init.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Initialize database and start server
async function startServer() {
  try {
    await initializeDatabase();
    
    // Routes
    app.use('/api/fuel', fuelRouter);
    app.use('/api/sales', salesRouter);
    app.use('/api/employees', employeeRouter);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong!' });
    });

    app.listen(PORT, () => {
      console.log(`Gas Station Management System running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();