import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Header from '../components/Header';
import MessageInput from '../components/MessageInput';
import MessageList from '../components/MessageList';
import { useState } from 'react';
import { SocketContext } from '../context/SocketContext';
import { useEffect } from 'react';
import messageService from '../services/messageService';
import userService from '../services/userService';

const LandingPage = () => {
  const { isLoggedIn, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    console.log('Messages:', messages);
  }, [messages]);

  useEffect(() => {
    console.log('Hi');
    getMessages();
  }, []);

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

  const getMessages = async () => {
    try {
      const messages = await messageService.getAll();
      setMessages(messages);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendMessage = async (message) => {
    const newMessage = {
      message: message,
      sender: user._id,
      date: new Date().toISOString(),
    };

    try {
      socket.emit('message', newMessage);
      const savedMessage = await messageService.create(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.error('Error Saving Message');
      console.log(error);
    }
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
