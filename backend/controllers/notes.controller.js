import Note from '../models/Note.js';
import { logActivity } from '../utils/logger.js';

// @desc    Create a new note
// @route   POST /api/notes
// @access  Public
export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const note = await Note.create({
            title,
            content
        });

        // Log the creation non-blocking
        logActivity('NOTE_CREATED', note.title);

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
