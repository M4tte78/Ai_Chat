# 🎯 AI Chat - Assistant IA avec Mistral-7B

Bienvenue sur **AI Chat**, une application web permettant d'interagir avec un assistant IA basé sur **Mistral-7B-Instruct-v0.2** via l'API Hugging Face.

## 🚀 Fonctionnalités
- 💬 **Chat en temps réel avec l'IA**
- 🌍 **Réponses strictement en français**
- 🗃 **Historique des conversations sauvegardé en base de données**
- 🎨 **Interface moderne et responsive**
- 🔒 **Sécurisation des clés API**

## 🏗️ Technologies utilisées
- **Backend** : Node.js, Express, MySQL, Axios
- **Frontend** : React (Vite), Tailwind CSS
- **IA** : Mistral-7B-Instruct-v0.2 via Hugging Face API

## 📦 Installation
### 1️⃣ Cloner le projet
```bash
git clone https://github.com/M4tte78/Ai_Chat.git
cd Ai_Chat
```

### 2️⃣ Configuration du backend
Dans le dossier `backend/`, crée un fichier `.env` et ajoute :
```env
HUGGINGFACE_API_KEY=ta_clé_api
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ai_chat
```

Installe les dépendances et démarre le serveur :
```bash
cd backend
npm install
node index.js
```

### 3️⃣ Configuration du frontend
Installe les dépendances et lance le projet React :
```bash
cd ../frontend
npm install
npm run dev
```

## 🛠️ Utilisation
1. Accède au frontend sur `http://localhost:5173`
2. Entre un message dans le chat
3. L'IA te répond strictement en français ! 🎉

## 🛡️ Sécurité
🚨 **Ne jamais pousser les clés API sur GitHub**
Ajoute `.env` dans `.gitignore` avant de committer !
```bash
echo "backend/.env" >> .gitignore
git rm --cached backend/.env
git commit -m "Supprime .env du suivi Git"
git push origin main
```

## 📜 Licence
Projet open-source sous licence MIT. Utilisation libre !

---
💡 **Besoin d'améliorations ?** Forke le projet et contribue ! 🚀
