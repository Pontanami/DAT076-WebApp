import React from 'react';
import logo from './Image/logo.png';
import trophy from './Image/trophy.jpg';
import './Home.css';
import {Link} from "react-router-dom";


function Home() {
  return (
    <div className="App">
      <nav>
        <div className="title">
          <h1>Higher or Lower</h1>
          <img className="logo" src={logo}/>
        </div>
        <div className="nav-links">
          <Link to="/Leaderboard"><img src={trophy} style={{width: "3rem"}}/></Link>
          <button className="question"></button>
        </div>
      </nav>
      <div className="container">
        <a href="host.html" type="button">Host game</a>
        <a href="playScreen.html" type="button">Single player</a>
        <a href="join.html" type="button">Join game</a>
      </div>
    </div>
  );
}

export default Home;
