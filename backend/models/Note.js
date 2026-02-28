import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
        },
        content: {
            type: String,
            required: [true, 'Please add content'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
