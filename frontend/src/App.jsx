import { useState, useEffect } from 'react';
import ChatInput from "./ChatInput"; 
import ChatHistory from "./ChatHistory";
import { sendMessage, getHistory } from "./chatService";
import "./App.css";


function App() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [history, setHistory] = useState([]);

    useEffect(() => {
        getHistory().then(setHistory);
    }, []);

    const handleSendMessage = async (msg) => {
        const aiResponse = await sendMessage(msg);
        setResponse(aiResponse);
        setHistory([{ user_message: msg, ai_response: aiResponse }, ...history]);
    };

    return (
        <div className="app">
            <h1>Chat IA</h1>
            <ChatInput onSendMessage={handleSendMessage} />
            <div className="response-container">
                {response && <p><strong>Réponse:</strong> {response}</p>}
            </div>
            <ChatHistory history={history} />
        </div>
    );
}

export default App;
