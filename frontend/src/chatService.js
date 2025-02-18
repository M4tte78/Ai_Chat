import axios from 'axios';

export const sendMessage = async (message) => {
    try {
        const response = await axios.post('http://localhost:5000/chat', { message });
        return response.data.response;
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message:', error);
        return 'Erreur lors de la communication avec l\'IA';
    }
};

export const getHistory = async () => {
    try {
        const response = await axios.get('http://localhost:5000/history');
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique:', error);
        return [];
    }
};
