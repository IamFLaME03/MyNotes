import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createNote = async (noteData) => {
    const response = await axios.post(`${API_URL}/notes`, noteData);
    return response.data;
};

export const getNotes = async () => {
    const response = await axios.get(`${API_URL}/notes`);
    return response.data;
};

export const deleteNote = async (id) => {
    const response = await axios.delete(`${API_URL}/notes/${id}`);
    return response.data;
};

// Export notes does not use axios directly here to handle the file download more elegantly in the component
export const getExportUrl = () => {
    return `${API_URL}/export`;
};
