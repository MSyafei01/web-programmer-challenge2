import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getDB } from '../config/database.js';

const router = express.Router();
