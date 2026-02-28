import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createNote } from '../services/api';
import { toast } from 'react-toastify';

const NoteForm = ({ onNoteAdded }) => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            title: '',
            content: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const newNote = await createNote(data);
            onNoteAdded(newNote);
            reset(); // Clear form
            toast.success('Note created successfully!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to create note');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Create a Note</h2>

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

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                {loading ? 'Saving...' : 'Save Note'}
            </button>
        </form>
    );
};

export default NoteForm;
