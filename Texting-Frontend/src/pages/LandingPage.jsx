import React, { useContext } from 'react';
import ModernButton from '../components/ModernButton';
import { Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';

const LandingPage = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  console.log({ user });
  const navigate = useNavigate();

  const handleSendMessage = (message) => {
    // Handle sending message logic here
    console.log('Sending message:', message);
  };

  return (
    <>
      <Header />
      <div className="chat-window">
        {/* Messages list component */}
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </>
  );
};

export default LandingPage;
