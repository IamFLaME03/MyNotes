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

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({}).sort({ createdAt: -1 }); // Newest first
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Public
export const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.title = title;
        note.content = content;

        const updatedNote = await note.save();

        // Log the update non-blocking
        logActivity('NOTE_UPDATED', updatedNote.title);

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Public
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Keep title reference before deletion for the logger
        const title = note.title;

        // Using deleteOne ensures the document is removed
        await Note.deleteOne({ _id: req.params.id });

        // Log the deletion non-blocking
        logActivity('NOTE_DELETED', title);

        res.status(200).json({ message: 'Note removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
