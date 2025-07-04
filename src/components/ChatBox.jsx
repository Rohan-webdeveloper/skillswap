// src/components/ChatBox.jsx
import { useState, useEffect, useRef } from 'react';
import '../styles/ChatBox.css';

export default function ChatBox({ messages, onSend }) {
  const [newMessage, setNewMessage] = useState('');
  const bottomRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    onSend(newMessage);
    setNewMessage('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender === 'me' ? 'me' : 'other'}`}>
            {msg.text}
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>
      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
