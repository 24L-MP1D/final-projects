'use client';

import { useEffect, useState } from 'react';

const App = () => {
  const [message, setMessage] = useState<string>(''); // Input талбарт бичсэн мессежийг хадгалах state

  const [messages, setMessages] = useState<string[]>([]); // Бүх мессежүүдийг хадгалах state

  const [socket, setSocket] = useState<WebSocket | null>(null); // WebSocket холбоос хадгалах state

  useEffect(() => {
    // WebSocket сервертэй холболт үүсгэх

    const newSocket = new WebSocket('ws://localhost:8080');

    newSocket.addEventListener('open', () => {
      console.log('WebSocket холболт нээгдлээ');
    });

    console.log('badral');

    newSocket.addEventListener('message', (event) => {
      setMessages((prevMessages) => [...prevMessages, 'Серверээс ирсэн: ' + event.data]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.send(message);
      setMessages((prevMessages) => [...prevMessages, 'Таны илгээсэн: ' + message]);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <h2>WebSocket-ээр мессеж илгээх</h2>

      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Мессежээ энд бичнэ үү" />
      <button onClick={sendMessage}>Send</button>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
