import React, { useState, useEffect, FormEvent } from 'react';
import './host.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';
import CurrentUser from './CurrentUser';
import axios from 'axios';
import errorHandler from './Error/ErrorHandling';
import { socket } from './socket';
import IPlayer from './IPlayer';

enum MPGameState {
  WAITINGROOM,
  PLAYING,
  GAMEOVER
}

function Host() {
  //GamePin är tom?
  const [gamePin, setGamePin] = useState<string>("");
  const [players, setPlayers] = useState<IPlayer[]>([])
  const [gameState, setGameState] = useState<MPGameState>(MPGameState.WAITINGROOM)
  const [gameId, setGameId] = useState<string>("");
  let Pin: string

  async function createGame() {
    try {
      const response = await axios.post("http://localhost:8080/multiPlayer", {
        hostId: CurrentUser.getId()
      })
      console.log("room created")
      //TODO: Denna kan behöva skrivas om lite, kanske sus att converta till en string. Göra det i Router? NU har vi två id, både game och pin. Kan kännas sus men
      setGameId(response.data[1])
      let stringPin = '' + response.data[0]
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
    try {
      const response = await axios.get(`http://localhost:8080/multiPlayer/${Pin}`)
      console.log(CurrentUser.getName())
      const players: IPlayer[] = response.data;
      setPlayers(players)
    } catch (e: any) {
      console.log("Error: " + e)
    }
  }

  //TODO: Rerender vid knapptryck därför är Pin null, är något som måste kollas på!
  async function startGame(e: any) {
    e.preventDefault()
    console.log("Host emitting startgame: " + gamePin)
    setGameState(MPGameState.PLAYING)
    socket.emit("start_game", {gamePin, gameId})
  }

  //TODO: Rerender vid knapptryck därför är Pin null, är något som måste kollas på!
  async function endGame() {
    setGameState(MPGameState.GAMEOVER)
    socket.emit("end_game", gamePin)
  }

  async function nextRound() {
    try {
      const response = await axios.post('http://localhost:8080/game/update', {
        gameId: gameId,
      });
      console.log("Host has started the next round")
      socket.emit("new_round", {gamePin, gameId})
    } catch (error: any) {
      errorHandler(error)
    }

  }

  switch (gameState) {
    case MPGameState.WAITINGROOM:
      return (
        <div className="Host">
          <Link to="/"><img alt='' src={back} style={{ width: "3rem" }} /></Link>
          <section className='host-container'>
            <h2>Game PIN:</h2>
            <h1>{gamePin}</h1>
            <button onClick={e => startGame(e)}>StartGame</button>
          </section>
          {players.map((player: IPlayer) =>
            <p>{player.name}</p>
          )}
        </div>
      );

    case MPGameState.PLAYING:
      return (
        <div className="Host">
          <button onClick={() => nextRound()}>Next Round</button>
          <button onClick={() => endGame()}>End Game</button>
        </div>
      )
    case MPGameState.GAMEOVER:
      return (
        <div className="Host">
          <p>The game has ended!</p>
          <Link to="/"><button className="homeButton" type="button">Home</button></Link>
        </div>
      )
  }


}


export default Host;