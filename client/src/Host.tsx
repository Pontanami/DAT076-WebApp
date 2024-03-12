import { useState, useEffect } from 'react';
import './host.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';
import CurrentUser from './CurrentUser';
import axios from 'axios';
import { socket } from './socket';
import Player from './IPlayer';
import { hostPort } from './hostPort';
import DisplayLeaderboard from './Leaderboard/DisplayLeaderboard';
import Course from './ICourse';


enum MPGameState {
  WAITINGROOM,
  PLAYING,
  GAMEOVER
}

/**
 * Component handling the host-specific functionality
 * @param errorHandler - function that takes an error and displays it correctly 
 * @returns 
 */
function Host({ errorHandler }: { errorHandler: (error: any) => void }) {
  const [players, setPlayers] = useState<Player[]>([])
  const [gameState, setGameState] = useState<MPGameState>(MPGameState.WAITINGROOM)
  const [gameId, setGameId] = useState<number>()

    /**
     * Function for creating a multiplayer game
     * @returns a promise of an id for the game we created
     */
   async function createGame(): Promise<number | undefined> {
    try {
      const response = await axios.post<number>(`http://${hostPort}:8080/multiPlayer`, {
        hostId: CurrentUser.getId()
      })
      setGameId(response.data)
      const id = response.data
      socket.emit("join_room", id);
      return id;
    } catch (error: any) {
      errorHandler(error)
      return undefined;
    }
  }

  useEffect(() => {
    const id: Promise<number | undefined> = createGame();

    if (id === undefined)
      return;

    socket.on('user_joined', () => {
      fetchPlayers(id)
    });

    socket.on('correct_answer', (userId) => {
      fetchPlayers(id)
    });
  }, []);

  /**
   * Function for fetching the players of a given game
   * @param idp - priomise of the id of our game
   */
  async function fetchPlayers(idp: Promise<number | undefined>) {
    try {
      const id = await idp;
      const response = await axios.get<Player[]>(`http://${hostPort}:8080/multiPlayer/${id}`)
      const players: Player[] = response.data;
      setPlayers(players)
    } catch (error: any) {
      errorHandler(error)
    }
  }

  async function startGame() {
    setGameState(MPGameState.PLAYING)
    socket.emit("start_game", gameId)
  }

  async function endGame() {
    setGameState(MPGameState.GAMEOVER)
    socket.emit("end_game", gameId)
  }

  /**
   * Function for updating the displayed questions for the users playing the multiplayer game
   */
  async function nextRound() {
    try {
      const response = await axios.post<[Course, Course]>(`http://${hostPort}:8080/game/update`, {
        gameId: gameId,
      });
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
    return <div className="end-game">
      <h2>The game has ended!</h2>
      <Link to="/home" style={{textDecoration: 'none'}}><button className="homeButton" type="button">Home</button></Link>
    </div>;
  }

  function HostPlayScreen() {
    return <div className="HostPlayScreen">
       <section className='buttons'>
        <button className="homeButton" onClick={() => endGame()}>End Game</button>
        <button className="homeButton" onClick={() => nextRound()}>Next Round</button>
       </section>
      <div className="Leaderboard">
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
        {players.map((player: Player) => <p className="player">{player.name}</p>
        )}
      </div>
    </div>;
  }

}

export default Host;