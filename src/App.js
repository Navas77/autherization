import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loginpage from './components/authorization';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Loginpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
