import React, { useEffect, useState } from 'react';
import logo from '../Image/logo.png';
import trophy from '../Image/trophy.jpg';
import './Home.css';
import { Link } from "react-router-dom";
import Login from './Login';
import about from '../Image/question.png'
import axios from 'axios';
import CurrentUser from '../CurrentUser';
import { hostPort } from '../hostPort';

function Home({ errorHandler }: { errorHandler: (error: any) => void }) {

  async function createPlayer() {
    try {
      await axios.post(`http://${hostPort}:8080/player`, {
        id: CurrentUser.getId(),
        name: CurrentUser.getName()

      });
      console.log("Player created:" + CurrentUser.getId())
    } catch (error: any) {
      errorHandler(error)
    }
  }
  
  return (
    <div className="Home">
      <nav>
        <div className="title">
          <h1>Higher or Lower</h1>
          <img className="logo" alt='' src={logo} />
        </div>

        <div className="nav-links">
          <Link to="/Leaderboard"><img src={trophy} alt='' style={{ width: "3rem" }} /></Link>
          <button className="question"><img src={about} alt='' style={{ width: "3rem" }} /></button>
        </div>

      </nav>
      <div className="container">
        <Link to="/host"><button className="homeButton" type="button">Host game</button></Link>
        <Link to="/join"><button className="homeButton" type="button" onClick={async () => createPlayer()}>Join game</button></Link>
        <Link to="/singleplayer"><button className="homeButton" type="button" onClick={async () => createPlayer()}>Single player</button></Link>
      </div>
    </div>
  );
  }

export default Home;
