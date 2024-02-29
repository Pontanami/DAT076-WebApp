import React, { useEffect, useState } from 'react';
import './join.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';
import axios from 'axios';
import { io } from 'socket.io-client';
import { socket } from './socket';
import CurrentUser from './CurrentUser';
import { useNavigate } from "react-router-dom";

function Join() {
  // State variable to store the entered PIN
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  async function handleSubmit() {
    // Save the PIN in a variable (for demonstration purposes)
    const enteredPin = pin;
    console.log('Submitted PIN:', enteredPin);
    //;
    // Clear the input field
    
    try {
      const join = await axios.post("http://localhost:8080/multiPlayer/addPlayer", {
        gameId: parseInt(pin, 10),
        playerId: CurrentUser.getId()
      })

    } catch (e: any) {
      console.log("Erroororor: " + e)
    }
    socket.emit("join_room", enteredPin);
    socket.emit("alert_joined", enteredPin);
    console.log(CurrentUser.getName())

    setPin('');

    //Emit event telling that the user has been added


    //Emit user has been added
  }

  // Function to handle PIN submission
  {/*async function handleSubmit() {

    
    // TODO send PIN to server instead
    const response = await axios.post('http://localhost:8000/', {gamepin : pin})
    .then(function(response: any){
    console.log(response);
    })

    setPin('');
  }; */}

  useEffect(() => {
    createPlayer()
  }, [])

  useEffect(() => {
    socket.on("starting", () => {
      console.log("Time to staaaaaart!!!")
      navigate("/multiplayer");
    })
  }, [socket])

  async function createPlayer() {
    try {
      await axios.post('http://localhost:8080/player', {
        id: CurrentUser.getId(),
        name: CurrentUser.getName()
      });
    } catch (error: any) {
      console.log("Coudn't create player")
    }
  }

  return (
    <div className="Join">
      <Link to="/"><img alt='' src={back} style={{ width: "3rem" }} /></Link>
      <section className='contents'>
        <h2>Enter game PIN:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{ fontSize: '20px' }}
          />
          <Link to="/joinscreen"><button type="submit" onClick={handleSubmit}>Join</button></Link>
        </form>
      </section>
    </div>
  );
}

export default Join;
