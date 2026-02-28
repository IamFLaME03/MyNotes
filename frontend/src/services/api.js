import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

export const createNote = async (noteData) => {
    const response = await axios.post(`${API_URL}/notes`, noteData);
    return response.data;
};

export const getNotes = async () => {
    const response = await axios.get(`${API_URL}/notes`);
    return response.data;
};

export const updateNote = async (id, noteData) => {
    const response = await axios.put(`${API_URL}/notes/${id}`, noteData);
    return response.data;
};

export const deleteNote = async (id) => {
    const response = await axios.delete(`${API_URL}/notes/${id}`);
    return response.data;
};

export const getExportUrl = (selectedIds = []) => {
    if (selectedIds.length > 0) {
        return `${API_URL}/export?ids=${selectedIds.join(',')}`;
    }
    return `${API_URL}/export`;
};
