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
    <StyledWrapper>
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
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .message-form {
    display: flex;
    align-items: flex-end;
    gap: 10px;
    padding: 15px;
    background: #f8f9fa;
    border-top: 1px solid #dee2e6;
  }

  textarea {
    flex: 1;
    padding: 12px;
    border: 1px solid #dee2e6;
    border-radius: 20px;
    resize: none;
    max-height: 150px;
    font-size: 0.95rem;
    line-height: 1.4;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #212529;
    }
  }

  .send-button {
    background: #212529;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #343a40;
      transform: scale(1.05);
    }

    &:disabled {
      background: #e9ecef;
      cursor: not-allowed;
      transform: none;
    }

    svg {
      font-size: 1.2rem;
    }
  }
`;

export default MessageInput;
