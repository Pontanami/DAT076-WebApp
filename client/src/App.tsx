import React from 'react';
import Home from './Home';
import { Routes, Route } from 'react-router-dom';
import Leaderboard from "./Leaderboard";
import Host from "./Host";
import Join from "./Join";
import Singleplayer from "./Singleplayer";


function App() {
  return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/host" element={<Host />} />
            <Route path="/join" element={<Join />} />
            <Route path="/singleplayer" element={<Singleplayer />} />
        </Routes>
    </div>
  );
}

export default App;
