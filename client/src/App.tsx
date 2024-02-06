import React from 'react';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import Leaderboard from "./Leaderboard";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
    </div>
  );
}

export default App;
