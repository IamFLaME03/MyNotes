import { useState, useEffect } from 'react';
import { getNotes, deleteNote } from '../services/api';

const NotesList = ({ notes, setNotes, loading, setLoading }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const data = await getNotes();
                setNotes(data);
                setError(null);
            } catch (err) {
                setError('Failed to load notes');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, [setNotes, setLoading]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;

        try {
            await deleteNote(id);
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            console.error('Failed to delete note', err);
            alert('Error deleting note');
        }
    };

    if (loading && notes.length === 0) return <div className="text-center p-8 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">Loading notes...</div>;
    if (error) return <div className="text-red-600 bg-red-50 p-4 rounded-lg mb-4 text-sm">{error}</div>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Notes</h2>
            {notes.length === 0 ? (
                <p className="text-center p-8 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">No notes found. Create some!</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {notes.map((note) => (
                        <div key={note._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">{note.title}</h3>
                            <p className="text-xs text-gray-500 mb-4">
                                {new Date(note.createdAt).toLocaleString()}
                            </p>
                            <p className="text-gray-700 whitespace-pre-wrap flex-grow mb-6">{note.content}</p>
                            <div className="flex justify-end">
                                <button
                                    onClick={() => handleDelete(note._id)}
                                    className="bg-red-500 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotesList;
