import React from 'react';
import logo from './Image/logo.png';
import './Home.css';
import {Link} from "react-router-dom";


function Home() {
  return (
    <div className="App">
      <h1>Higher or Lower</h1>
      <img className="logo" src={logo}/>
      <button className="question"></button>
      <p><Link to="/Leaderboard">Leaderboard</Link></p>
      <div className="container">
        <a href="host.html" type="button">Host game</a>
        <a href="playScreen.html" type="button">Single player</a>
        <a href="join.html" type="button">Join game</a>
      </div>
    </div>
  );
}

export default Home;
