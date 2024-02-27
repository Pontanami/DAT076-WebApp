import React, { useEffect, useState } from 'react';
import './host.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';
import CurrentUser from './CurrentUser';
import axios from 'axios';
import errorHandler from './Error/ErrorHandling';
import { SocketIO } from './socket';
import { io } from 'socket.io-client';

const socket = io("http://localhost:8080");

function Host() {
    const [gamePin, setGamePin] = useState<number>();

    async function createGame (){
      try {
        const gamePin = await axios.post("http://localhost:8080/multiPlayer", {
          hostId: CurrentUser.getId()
        })
        setGamePin(gamePin.data);
      } catch (error: any) {
          errorHandler(error)
      }
    }

    useEffect(() => {
      socket.emit('connection');
  }, []);

  return (
    <div className="Host">
        <Link to="/"><img alt=''src={back} style={{width: "3rem"}}/></Link>
        <button onClick={createGame}>Create Game</button>
        <h2>Game PIN: {gamePin}</h2>
    </div>
  );
}

export default Host;