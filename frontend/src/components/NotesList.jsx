import { useState, useEffect } from 'react';
import { getNotes, deleteNote, getExportUrl } from '../services/api';
import { toast } from 'react-toastify';

const NotesList = ({
    notes,
    setNotes,
    loading,
    setLoading,
    setEditingNote,
    selectedNoteIds,
    setSelectedNoteIds
}) => {
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                setLoading(true);
                const data = await getNotes();
                setNotes(data);
            } catch (err) {
                toast.error('Failed to load notes from server');
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
            // Remove from selection if deleted
            setSelectedNoteIds(prev => prev.filter(noteId => noteId !== id));
            toast.info('Note deleted');
        } catch (err) {
            console.error('Failed to delete note', err);
            toast.error('Error deleting note');
        }
    };

    const handleSelectToggle = (id) => {
        if (selectedNoteIds.includes(id)) {
            setSelectedNoteIds(selectedNoteIds.filter(noteId => noteId !== id));
        } else {
            setSelectedNoteIds([...selectedNoteIds, id]);
        }
    };

    if (loading && notes.length === 0) return <div className="text-center p-8 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">Loading notes...</div>;

    return (
        <div>
            <div className="flex justify-between items-end mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Your Notes</h2>
                {notes.length > 0 && (
                    <span className="text-sm text-gray-500">
                        {selectedNoteIds.length} selected
                    </span>
                )}
            </div>

            {notes.length === 0 ? (
                <p className="text-center p-8 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-100">No notes found. Create some!</p>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className={`bg-white p-6 rounded-xl shadow-sm border flex flex-col hover:shadow-md transition-all ${selectedNoteIds.includes(note._id) ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-100'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        checked={selectedNoteIds.includes(note._id)}
                                        onChange={() => handleSelectToggle(note._id)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                                    />
                                    {note.title}
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditingNote(note)}
                                        className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded text-sm font-medium transition-colors"
                                    >
                                        Update
                                    </button>
                                    <a
                                        href={getExportUrl([note._id])}
                                        download
                                        className="text-emerald-600 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer text-center"
                                    >
                                        Export
                                    </a>
                                    <button
                                        onClick={() => handleDelete(note._id)}
                                        className="bg-red-500 text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-red-600 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mb-4 pl-7">
                                {new Date(note.createdAt).toLocaleString()}
                            </p>
                            <p className="text-gray-700 whitespace-pre-wrap flex-grow mb-2 pl-7">{note.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotesList;
