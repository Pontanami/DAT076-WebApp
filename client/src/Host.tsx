import { useState, useEffect} from 'react';
import './host.css';
import './Leaderboard/leaderboard.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';
import CurrentUser from './CurrentUser';
import axios from 'axios';
import { socket } from './socket';
import IPlayer from './IPlayer';
import { hostPort } from './hostPort';
import DisplayLeaderboard from './Leaderboard/DisplayLeaderboard';

enum MPGameState {
  WAITINGROOM,
  PLAYING,
  GAMEOVER
}

function Host({errorHandler} : {errorHandler: (error : any) => void}) {
  const [players, setPlayers] = useState<IPlayer[]>([])
  const [gameState, setGameState] = useState<MPGameState>(MPGameState.WAITINGROOM)
  const [gameId, setGameId] = useState<number>()

  async function createGame() : Promise<number | undefined> {
    try {
      const response = await axios.post<number>(`http://${hostPort}:8080/multiPlayer`, {
        hostId: CurrentUser.getId()
      })
      console.log("room created")

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
  }, []);

  async function fetchPlayers(idp : Promise<number | undefined>) {
    try {
      const id = await idp;
      console.log("id:" + id);
      console.log("gameId: " + gameId);
      const response = await axios.get(`http://${hostPort}:8080/multiPlayer/${id}`)
      console.log(CurrentUser.getName())
      const players: IPlayer[] = response.data;
      setPlayers(players)
    } catch (error: any) {
      errorHandler(error)
    }
  }

  async function startGame() {
    console.log("Host emitting startgame: " + gameId)
    setGameState(MPGameState.PLAYING)
    socket.emit("start_game", gameId)
  }

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
            <DisplayLeaderboard
              playerList={players}
            />
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