import express from 'express';
import { createNote, getNotes, updateNote, deleteNote } from '../controllers/notes.controller.js';

const router = express.Router();

router.route('/').post(createNote).get(getNotes);
router.route('/:id').put(updateNote).delete(deleteNote);

export default router;
