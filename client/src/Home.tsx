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
          <img className="logo" alt='' src={logo}/>
        </div>
        <div className="nav-links">
          <Link to="/Leaderboard"><img src={trophy} alt='' style={{width: "3rem"}}/></Link>
          <button className="question"></button>
        </div>
      </nav>
      <div className="container">
        <Link to="/host"><button type="button">Host game</button></Link>
        <Link to="/join"><button type="button">Join game</button></Link>
        <Link to="/singleplayer"><button type="button">Single player</button></Link>
      </div>
    </div>
  );
}

export default Home;
