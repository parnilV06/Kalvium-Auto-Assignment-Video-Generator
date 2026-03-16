import express from 'express';
import { generateVideoController } from '../controllers/generateController.js';

const router = express.Router();

router.post('/', generateVideoController);

export default router;
