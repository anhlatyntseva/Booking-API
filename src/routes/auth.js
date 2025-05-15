import express from 'express';
import { loginUser } from '../services/authService.js';

const router = express.Router();

router.post('/', loginUser);

export default router;