import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function ChatPage() {
  const { session } = useAuth();
  const { id: receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  const userId = session?.user?.id;

  useEffect(() => {
    fetchMessages();
    updateLastSeen(); // ✅ update last seen on chat open

    const channel = supabase
      .channel('realtime:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender.eq.${userId},receiver.eq.${userId}`)
      .order('created_at', { ascending: true });

    if (!error) {
      const filtered = data.filter(
        (msg) =>
          (msg.sender === userId && msg.receiver === receiverId) ||
          (msg.sender === receiverId && msg.receiver === userId)
      );
      setMessages(filtered);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    await supabase.from('messages').insert([
      {
        sender: userId,
        receiver: receiverId,
        content: newMsg,
      },
    ]);

    setNewMsg('');
    updateLastSeen(); // ✅ update last seen on message send
  };

  const updateLastSeen = async () => {
    if (!userId) return;
    await supabase
      .from('profiles')
      .update({ last_seen: new Date().toISOString() })
      .eq('id', userId);
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.sender === userId ? 'flex-end' : 'flex-start',
              backgroundColor: msg.sender === userId ? '#1976d2' : '#eeeeee',
              color: msg.sender === userId ? '#fff' : '#000',
            }}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={styles.inputArea}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.sendBtn}>Send</button>
      </form>
    </div>
  );
}

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    maxWidth: '600px',
    margin: 'auto',
    padding: '1rem',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  chatBox: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1rem',
    borderBottom: '1px solid #ccc',
  },
  message: {
    maxWidth: '70%',
    padding: '0.6rem 1rem',
    borderRadius: '16px',
    fontSize: '0.95rem',
  },
  inputArea: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  input: {
    flex: 1,
    padding: '0.7rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  sendBtn: {
    padding: '0.7rem 1.2rem',
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
