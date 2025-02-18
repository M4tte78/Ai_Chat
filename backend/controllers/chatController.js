const axios = require('axios');
const db = require('../db');

const handleChat = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
            {
                inputs: `Réponds uniquement en français et réponds de manière naturelle à cette question : ${message}`,
                parameters: { max_new_tokens: 200 }
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        let aiResponse = response.data[0]?.generated_text || "Aucune réponse générée.";

        db.query(
            'INSERT INTO conversations (user_message, ai_response) VALUES (?, ?)',
            [message, aiResponse],
            (err) => {
                if (err) console.error('❌ Erreur lors de l\'insertion en BDD', err);
            }
        );

        res.json({ response: aiResponse });
    } catch (error) {
        console.error('❌ Erreur avec l\'API Hugging Face:', error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data?.error || 'Erreur serveur' });
    }
};

module.exports = { handleChat };