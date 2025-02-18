const axios = require('axios');
const db = require('../db');

const handleChat = async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2',
            {
                inputs: `Réponds uniquement en français et ne mets aucune phrase en anglais. Voici ma question : ${message}`,
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

        // Vérifier si la réponse contient une phrase en anglais et la traduire automatiquement
        if (aiResponse.match(/[a-zA-Z]/) && !aiResponse.match(/[éàèùçâêîôûëïü]/i)) {
            console.warn("⚠️ La réponse contient de l'anglais, elle sera traduite...");
            aiResponse = await translateResponse(aiResponse);
        }

        // Enregistrement en base de données
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

// Fonction pour traduire automatiquement en français si la réponse est en anglais
const translateResponse = async (text) => {
    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-fr',
            { inputs: text },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data[0]?.translation_text || "Impossible de traduire la réponse.";
    } catch (error) {
        console.error("❌ Erreur de traduction :", error.message);
        return "Une erreur s'est produite lors de la traduction.";
    }
};

module.exports = { handleChat };
