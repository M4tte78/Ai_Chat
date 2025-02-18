const ChatHistory = ({ history }) => {
    return (
        <div className="history">
            <h2>Historique</h2>
            {history.length === 0 ? (
                <p>Aucun message dans l'historique.</p>
            ) : (
                history.map((conv, index) => (
                    <div key={index} className="history-item">
                        <p><strong>Vous:</strong> {conv.user_message}</p>
                        <p><strong>IA:</strong> {conv.ai_response}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ChatHistory;
