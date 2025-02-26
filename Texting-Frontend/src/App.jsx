import { useState } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';
import Signup from './pages/signup';
import Login from './pages/login';

import LandingPage from './pages/LandingPage';

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route
              path="/login"
              element={<Login />}></Route>
            <Route
              path="/signup"
              element={<Signup />}></Route>

            <Route
              path="/"
              element={<LandingPage />}></Route>
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;
