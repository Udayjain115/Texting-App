import React, { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const MessageList = ({ messages = [] }) => {
  const { user } = useContext(AuthContext);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <div className="messages-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.senderId === user?._id ? 'sent' : 'received'
            }`}>
            <div className="message-content">
              <p>{message.text}</p>
              <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default MessageList;
