import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import { useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useEffect } from 'react';
const LandingPage = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    console.log('Messages:', messages);
  }, [messages]);

  useEffect(() => {
    if (socket) {
      console.log('Setting up socket listener');
      socket.on('message', (message) => {
        handleReceiveMessage(message);
      });

      return () => {
        console.log('Cleaning up socket listener');
        socket.off('message');
      };
    }
  }, [socket]);

  const handleSendMessage = (message) => {
    const newMessage = {
      text: message,
      senderId: user._id,
      timestamp: new Date().toISOString(),
    };

    socket.emit('message', newMessage);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleReceiveMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      {isLoggedIn && (
        <div className="flex-grow-1 position-relative">
          <MessageList messages={messages} />
          <div className="position-absolute bottom-0 w-100">
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
