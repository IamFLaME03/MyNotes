import { useState } from 'react';
import { createNote } from '../services/api';

const NoteForm = ({ onNoteAdded }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            setError('Both title and content are required');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const newNote = await createNote({ title, content });
            onNoteAdded(newNote); // Callback to update parent list

            // Clear form
            setTitle('');
            setContent('');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create note');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Create a Note</h2>
            {error && <div className="text-red-600 bg-red-50 p-3 rounded-lg mb-4 text-sm">{error}</div>}

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
            </div>

            <div className="mb-4">
                <textarea
                    placeholder="Write your note here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    disabled={loading}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={loading || !title.trim() || !content.trim()}
                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? 'Saving...' : 'Save Note'}
            </button>
        </form>
    );
};

export default NoteForm;
