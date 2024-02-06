import React from 'react';
import logo from './Image/logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Higher or Lower</h1>
      <img className="logo" src={logo}/>
      <button className="question"></button>
      <a href="leaderboard.html"><i className="bi bi-trophy">
        </i></a>
      <div className="container">
        <a href="host.html" type="button">Host game</a>
        <a href="playScreen.html" type="button">Single player</a>
        <a href="join.html" type="button">Join game</a>
      </div>
    </div>
  );
}

export default App;
