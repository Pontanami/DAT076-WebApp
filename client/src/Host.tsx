import React, { useState, useEffect, FormEvent } from 'react';
import './host.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';
import CurrentUser from './CurrentUser';
import axios from 'axios';
import errorHandler from './Error/ErrorHandling';
import { socket } from './socket';
import IPlayer from './IPlayer';



function Host() {
  //GamePin är tom?
    const [gamePin, setGamePin] = useState<string>("");
    const [players, setPlayers] = useState<IPlayer[]>([])
    let Pin : string

    async function createGame (){
      try {
        const response = await axios.post("http://localhost:8080/multiPlayer", {
          hostId: CurrentUser.getId()
        })
        console.log("room created")
        //TODO: Denna kan behöva skrivas om lite, kanske sus att converta till en string. Göra det i Router?
        let stringPin = '' + response.data
        console.log("GamePIn" + stringPin)
        setGamePin(stringPin)
        Pin = stringPin
        console.log("Pin is:" + Pin)
        //setGamePin(response.data.toString());
        socket.emit("join_room", stringPin);
      } catch (error: any) {
          errorHandler(error)
      }
    }
    
    useEffect(() => {
      createGame();
    }, []); 

    useEffect(() => {
      socket.on('user_joined', () => {
        fetchPlayers()
        console.log("User has been added")
      });
    }, [socket]);

  async function fetchPlayers() {
    try{
      const response = await axios.get(`http://localhost:8080/multiPlayer/${Pin}`)
      console.log(CurrentUser.getName())
      const players: IPlayer[] = response.data;
      setPlayers(players)
    }catch(e : any){
      console.log("Error: " + e)
    }
  }

  //TODO: Rerender vid knapptryck därför är Pin null, är något som måste kollas på!
  async function startGame(e : any) {
    e.preventDefault()
    console.log("Host emitting startgame: " + gamePin)
    socket.emit("start_game", gamePin)
  }
    
  
  return (
    <div className="Host">
        <Link to="/"><img alt=''src={back} style={{width: "3rem"}}/></Link>
        <section className='host-container'>
          <h2>Game PIN:</h2>
          <h1>{gamePin}</h1>
          <button onClick={e =>startGame(e)}>StartGame</button>
        </section>
        {players.map((player: IPlayer) => 
        <p>{player.name}</p>
        )}
    </div>
  );
}


export default Host;