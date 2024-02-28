import React, { useState, useEffect } from 'react';
import './host.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';
import CurrentUser from './CurrentUser';
import axios from 'axios';
import errorHandler from './Error/ErrorHandling';
import { socket } from './socket';



function Host() {
    const [gamePin, setGamePin] = useState('');
    useEffect(() => {
      // Initialize ketLines with three elements when the component mounts
      async function createGame (){
        try {
          const gamePin = await axios.post("http://localhost:8080/multiPlayer", {
            hostId: CurrentUser.getId()
          })
          //TODO: Denna kan behöva skrivas om lite, kanske sus att converta till en string. Göra det i Router?
          let stringPin = gamePin.data.toString()
          setGamePin(stringPin);
          socket.emit("join_room", stringPin);
        } catch (error: any) {
            errorHandler(error)
        }
      }
      createGame();
    }, []); 

    useEffect(() => {
      socket.on('user_joined', () => {
        console.log("User has been added")
      });
    }, [socket]);
    
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