const db = require('../db');

const getHistory = (req, res) => {
    db.query('SELECT * FROM conversations ORDER BY created_at DESC', (err, results) => {
        if (err) {
            console.error('❌ Erreur lors de la récupération des données', err);
            res.status(500).json({ error: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
};

module.exports = { getHistory };
