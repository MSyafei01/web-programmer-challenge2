import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { getDB } from '../config/database.js';
import { loginRateLimit } from '../middleware/auth.js';

const router = express.Router();
