import express from 'express';
import { exportNotes } from '../controllers/export.controller.js';

const router = express.Router();

router.get('/', exportNotes);

export default router;
