import React, { useEffect } from 'react';
import logo from '../Image/logo.png';
import trophy from '../Image/trophy.jpg';
import './Home.css';
import { Link } from "react-router-dom";
import about from '../Image/question.png'
import axios from 'axios';
import CurrentUser from '../CurrentUser';
import { hostPort } from '../hostPort';
import Player from '../IPlayer';

function Home({ errorHandler }: { errorHandler: (error: any) => void }) {

  async function createPlayer() {
    try {
      await axios.post<Player>(`http://${hostPort}:8080/player`, {
        id: CurrentUser.getId(),
        name: CurrentUser.getName()

      });
    } catch (error: any) {
      errorHandler(error)
    }
  }

  useEffect(()=>{
    createPlayer()
  })

  return (
    <div className="Home">
      <nav>
        <div className="title">
          <h1>Higher or Lower</h1>
          <img className="logo" alt='' src={logo} />
        </div>

        <div className="nav-links">
          <Link to="/Leaderboard"><img src={trophy} alt='' style={{ width: "3rem" }} /></Link>
        </div>

      </nav>
      <div className="container">
        <Link to="/host" style={{textDecoration: 'none'}}><button className="homeButton" type="button">Host game</button></Link>
        <Link to="/join" style={{textDecoration: 'none'}}><button className="homeButton" type="button" onClick={async () => createPlayer()}>Join game</button></Link>
        <Link to="/singleplayer" style={{textDecoration: 'none'}}><button className="homeButton" type="button" onClick={async () => createPlayer()}>Single player</button></Link>
      </div>
    </div>
  );
  }

export default Home;
