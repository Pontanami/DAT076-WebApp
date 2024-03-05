import { useEffect, useState } from 'react';
import './join.css';
import { Link } from 'react-router-dom';
import back from './Image/back.svg';
import axios from 'axios';
import { socket } from './socket';
import CurrentUser from './CurrentUser';
import { useNavigate } from "react-router-dom";
import { hostPort } from './hostPort'

function Join({errorHandler} : {errorHandler: (error : any) => void}) {
  // State variable to store the entered PIN
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  async function handleSubmit() {
    // Save the PIN in a variable (for demonstration purposes)
    const intId = parseInt(pin, 10);
    console.log('Submitted PIN:', intId);
    //;
    // Clear the input field

    try {
      const join = await axios.post(`http://${hostPort}:8080/multiPlayer/addPlayer`, {
        gameId: intId,
        playerId: CurrentUser.getId()
      })

    } catch (error: any) {
      errorHandler(error)
    }
    socket.emit("join_room", intId);
    socket.emit("alert_joined", intId);
    console.log(CurrentUser.getName())

    setPin('');

    //Emit event telling that the user has been added


    //Emit user has been added
  }

  useEffect(() => {
    socket.on("starting", (game) => {
      console.log("Time to staaaaaart!!!")
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
          <Link to="/joinscreen"><button type="submit" onClick={handleSubmit}>Join</button></Link>
        </form>
      </section>
    </div>
  );
}

export default Join;
