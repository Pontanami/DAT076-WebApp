import { useEffect, useState } from 'react';
import './join.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';
import axios from 'axios';
import { socket } from './socket';
import CurrentUser from './CurrentUser';
import { useNavigate } from "react-router-dom";
import { hostPort } from './hostPort'

/**
 * Component displaying and handling functionality related to joining a multiplayer game
 * @param errorHandler - function that takes an error and displays it correctly 
 * @returns a displayable page for joining a multiplayer game
 */
function Join({errorHandler} : {errorHandler: (error : any) => void}) {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  /**
   * Function for adding a player to a multiplayer game
   */
  async function handleSubmit() {
    const intId = parseInt(pin, 10);

    try {
      const join = await axios.post<boolean>(`http://${hostPort}:8080/multiPlayer/addPlayer`, {
        gameId: intId,
        playerId: CurrentUser.getId()
      })

    } catch (error: any) {
      errorHandler(error)
    }
    socket.emit("join_room", intId);
    socket.emit("alert_joined", intId);
    setPin('');
  }

  useEffect(() => {
    socket.on("starting", (game) => {
      navigate("/multiplayer", { state: game });
    })
  }, [socket])

  return (
    <div className="Join">
      <Link to="/home"><img alt='' src={back} style={{ width: "3rem" }} /></Link>
      <section className='contents'>
        <h2>Enter game PIN:</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{ fontSize: '20px' }}
          />
          <Link to="/joinscreen" style={{textDecoration: 'none'}}><button type="submit" onClick={handleSubmit}>Join</button></Link>
        </form>
      </section>
    </div>
  );
}

export default Join;
