import fs from 'fs/promises';
import path from 'path';
import Note from '../models/Note.js';

// @desc    Export notes to a text file (supports ?ids=id1,id2)
// @route   GET /api/export
// @access  Public
export const exportNotes = async (req, res) => {
    try {
        const { ids } = req.query;
        let query = {};

        // If specific IDs are requested, filter the query
        if (ids) {
            const idArray = ids.split(',');
            query = { _id: { $in: idArray } };
        }

        // 1. Fetch notes from MongoDB
        const notes = await Note.find(query).sort({ createdAt: -1 });

        // 2. Transform the notes into formatted plain text
        if (notes.length === 0) {
            return res.status(404).json({ message: 'No notes found to export' });
        }

        let fileContent = '--- MY NOTES EXPORT ---\n\n';
        notes.forEach((note) => {
            fileContent += `Title: ${note.title}\n`;
            fileContent += `Created: ${new Date(note.createdAt).toLocaleString()}\n`;
            fileContent += `\n${note.content}\n`;
            fileContent += '-'.repeat(40) + '\n\n';
        });

        // 3. Create notes.txt securely in the server temporarily
        const tempFilePath = path.join(process.cwd(), 'notes.txt');
        await fs.writeFile(tempFilePath, fileContent, 'utf-8');

        // 4. Send the file as an HTTP download with correct headers
        res.download(tempFilePath, 'notes.txt', async (err) => {
            if (err) {
                console.error('Error downloading the file:', err.message);
                if (!res.headersSent) {
                    res.status(500).json({ message: 'Error processing download' });
                }
            }

            // Cleanup the temporary file asynchronously after sending it
            try {
                await fs.unlink(tempFilePath);
            } catch (unlinkError) {
                console.error('Failed to cleanup temp file:', unlinkError.message);
            }
        });

    } catch (error) {
        console.error('Export Error:', error.message);
        res.status(500).json({ message: 'Server error during export', error: error.message });
    }
};
