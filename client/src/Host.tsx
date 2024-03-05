import React, { useState, useEffect, FormEvent } from 'react';
import './host.css';
import './Leaderboard/leaderboard.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';
import CurrentUser from './CurrentUser';
import axios from 'axios';
import errorHandler from './Error/ErrorHandling';
import { socket } from './socket';
import IPlayer from './IPlayer';
import { hostPort } from './hostPort';
import LeaderboardPlayer from './Leaderboard/LeaderboardPlayer';

enum MPGameState {
  WAITINGROOM,
  PLAYING,
  GAMEOVER
}

function Host() {
  const [players, setPlayers] = useState<IPlayer[]>([])
  const [gameState, setGameState] = useState<MPGameState>(MPGameState.WAITINGROOM)
  const [gameId, setGameId] = useState<number>()

  async function createGame() : Promise<number | undefined> {
    try {
      const response = await axios.post<number>(`http://${hostPort}:8080/multiPlayer`, {
        hostId: CurrentUser.getId()
      })
      console.log("room created")
      //TODO: Denna kan behöva skrivas om lite, kanske sus att converta till en string. Göra det i Router? NU har vi två id, både game och pin. Kan kännas sus men
      setGameId(response.data)
      const id = response.data
      console.log("gameID: " + id);
      console.log("Wrong game ID: " + gameId);
      socket.emit("join_room", id);
      return id;
    } catch (error: any) {
      errorHandler(error)
      return undefined;
    }
  }

  useEffect(() => {
    const id : Promise<number | undefined> = createGame();
    if (id === undefined) return;
    socket.on('user_joined', () => {
      fetchPlayers(id)
      console.log("User has been added")
    });
    socket.on('correct_answer', (userId) => {
      console.log(`Correct answer for: ${userId}`)
      fetchPlayers(id)
    });
  }, [socket]);

  async function fetchPlayers(idp : Promise<number | undefined>) {
    try {
      const id = await idp;
      console.log("id:" + id);
      console.log("gameId: " + gameId);
      const response = await axios.get(`http://${hostPort}:8080/multiPlayer/${id}`)
      console.log(CurrentUser.getName())
      const players: IPlayer[] = response.data;
      setPlayers(players)
    } catch (e: any) {
      console.log("Error: " + e)
    }
  }

  //TODO: Rerender vid knapptryck därför är Pin null, är något som måste kollas på!
  async function startGame() {
    console.log("Host emitting startgame: " + gameId)
    setGameState(MPGameState.PLAYING)
    socket.emit("start_game", gameId)
  }

  //TODO: Rerender vid knapptryck därför är Pin null, är något som måste kollas på!
  async function endGame() {
    setGameState(MPGameState.GAMEOVER)
    socket.emit("end_game", gameId)
  }

  async function nextRound() {
    try {
      const response = await axios.post(`http://${hostPort}:8080/game/update`, {
        gameId: gameId,
      });
      console.log("Host has started the next round")
      socket.emit("new_round", gameId)
    } catch (error: any) {
      errorHandler(error)
    }

  }

  switch (gameState) {
    case MPGameState.WAITINGROOM:
      return (
        <HostWaitingScreen />
      );

    case MPGameState.PLAYING:
      return (
        <HostPlayScreen />
      )
    case MPGameState.GAMEOVER:
      return (
        <HostGameOverScreen />
      )
  }



  function HostGameOverScreen() {
    return <div className="Host">
      <p>The game has ended!</p>
      <Link to="/home"><button className="homeButton" type="button">Home</button></Link>
    </div>;
  }

  function HostPlayScreen() {
    return <div className="Host">
      
      <div className="Leaderboard">
      <button className="homeButton" onClick={() => nextRound()}>Next Round</button>
      <button className="homeButton" onClick={() => endGame()}>End Game</button>
          <section className="text-center">
            <div id="leaderboard">
              <div className="columnNames">
                <strong className="">Rank</strong>
                <strong className="">Name</strong>
                <strong className="">Score</strong>
              </div>
              <section className="row">
                {players.map((player: IPlayer, index: number) =>
                  <LeaderboardPlayer player={player} index={index + 1} key={player.id} />
                )}
              </section>
            </div>
          </section>
        </div>
    </div>;
  }

  function HostWaitingScreen() {
    return <div className="Host">
      <Link to="/home"><img alt='' src={back} style={{ width: "3rem" }} /></Link>
      <section className='host-container'>
        <h2>Game PIN:</h2>
        <h1>{gameId}</h1>
        <button className="homeButton" onClick={e => startGame()}>StartGame</button>
      </section>
      <div className='joined-container'>
        {players.map((player: IPlayer) => <p className="player">{player.name}</p>
        )}
      </div>
    </div>;
  }

}

export default Host;