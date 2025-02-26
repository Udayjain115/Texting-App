import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { isLoggedIn, user } = useContext(AuthContext);

  const socket = useMemo(() => {
    return io('http://localhost:3000', {
      autoConnect: false,
      reconnection: true,
    });
  }, []);

  useEffect(() => {
    if (isLoggedIn && user && !socket.connected) {
      socket.connect();

      return () => {
        if (socket.connected) {
          socket.disconnect();
        }
      };
    }
  }, [isLoggedIn, user, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
