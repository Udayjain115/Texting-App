import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/signup';

import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/signup"
          element={<Signup />}></Route>

        <Route
          path="/"
          element={<LandingPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
