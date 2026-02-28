import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createNote, updateNote } from '../services/api';
import { toast } from 'react-toastify';

const NoteForm = ({ onNoteAdded, onNoteUpdated, editingNote, setEditingNote }) => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: '',
            content: ''
        }
    });

    // Populate form if we are editing
    useEffect(() => {
        if (editingNote) {
            setValue('title', editingNote.title);
            setValue('content', editingNote.content);
        } else {
            reset();
        }
    }, [editingNote, setValue, reset]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            if (editingNote) {
                const updated = await updateNote(editingNote._id, data);
                onNoteUpdated(updated);
                setEditingNote(null);
                toast.success('Note updated successfully!');
            } else {
                const newNote = await createNote(data);
                onNoteAdded(newNote);
                toast.success('Note created successfully!');
            }
            reset(); // Clear form
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save note');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditingNote(null);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {editingNote ? 'Edit Note' : 'Create a Note'}
            </h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Note Title"
                    disabled={loading}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                    {...register('title', {
                        required: 'Title is required',
                        maxLength: {
                            value: 100,
                            message: 'Title cannot exceed 100 characters'
                        }
                    })}
                />
                {errors.title && (
                    <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                )}
            </div>

            <div className="mb-4">
                <textarea
                    placeholder="Write your note here..."
                    disabled={loading}
                    rows="4"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-y ${errors.content ? 'border-red-500 bg-red-50' : 'border-gray-300'
                        }`}
                    {...register('content', {
                        required: 'Content cannot be empty'
                    })}
                ></textarea>
                {errors.content && (
                    <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
                )}
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-grow bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Saving...' : (editingNote ? 'Update Note' : 'Save Note')}
                </button>

                {editingNote && (
                    <button
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={loading}
                        className="bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg hover:bg-gray-300 disabled:opacity-50 transition-colors"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default NoteForm;
