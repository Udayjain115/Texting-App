import React, { useContext } from 'react';
import ModernButton from '../components/ModernButton';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import { useState } from 'react';

const LandingPage = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (message) => {
    const newMessage = {
      text: message,
      senderId: user.id,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="flex-grow-1 position-relative">
        <MessageList messages={messages} />
        <div className="position-absolute bottom-0 w-100">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
