require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./routes/chatRoutes');
const historyRoutes = require('./routes/historyRoutes');
const db = require('./db');

const app = express();
app.use(express.json());
app.use(cors());

// Routes API
app.use('/chat', chatRoutes);
app.use('/history', historyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur lancé sur le port ${PORT}`));
