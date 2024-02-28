import React, { useState, useEffect } from 'react';
import './host.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';
import CurrentUser from './CurrentUser';
import axios from 'axios';
import errorHandler from './Error/ErrorHandling';
import { io } from 'socket.io-client';

const socket = io("http://localhost:8080");

function Host() {
    const [gamePin, setGamePin] = useState<number>();
    useEffect(() => {
      // Initialize ketLines with three elements when the component mounts
      async function createGame (){
        try {
          const gamePin = await axios.post("http://localhost:8080/multiPlayer", {
            hostId: CurrentUser.getId()
          })
          setGamePin(gamePin.data);
          socket.emit('room', gamePin)
        } catch (error: any) {
            errorHandler(error)
        }
      }
      createGame();
    }, []); 
    
  return (
    <div className="Host">
        <Link to="/"><img alt=''src={back} style={{width: "3rem"}}/></Link>
        <section className='host-container'>
          <h2>Game PIN:</h2>
          <h1>{gamePin}</h1>
        </section>
    </div>
  );
}

export default Host;