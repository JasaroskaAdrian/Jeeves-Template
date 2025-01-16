import express from 'express';
import cors from 'cors';
import http from 'http';
import winston from 'winston';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 9237;

// Helper to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Winston Logger
const { printf, combine, timestamp, colorize } = winston.format;
const serverLogger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD hh:mm:ss.SSS A' }),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
  ),
  transports: [
    new winston.transports.File({ filename: './server/logs/serverLogs.log' }),
    new winston.transports.Console(),
  ],
});

// Middleware setup
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  })
);

// Serve static files
app.use(express.static(path.join(__dirname, '../../client')));

// Routes for HTML pages
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/html/dashboard.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/html/login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/html/registration.html'));
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  serverLogger.info(`Server started on http://localhost:${PORT}`);
});

export const viteNodeApp = app;