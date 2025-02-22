import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoSend } from 'react-icons/io5';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [message]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="message-form">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          rows={1}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!message.trim()}>
          <IoSend />
        </button>
      </form>
    </>
  );
};

export default MessageInput;
