import { Link } from "react-router-dom";

function Gameover() {
    
    function getRandomGif() {
        const rndInt = Math.floor(Math.random() * 6) + 1;
        const dynamicFile = require('../Image/gifs/end' + rndInt + '.gif');
        return dynamicFile;
    }
    
    return (
        <div className='endScreen'>
            <h2>Game Over</h2>
            <img className='gif' src={getRandomGif()} />
            <div className='endButtons'>
                <Link to="/home"><button className="homeButton" type="button">Home</button></Link>
                <Link to="/leaderboard"><button className="homeButton" type="button">Leaderboard</button></Link>
            </div>
        </div>
    )

    
}

export default Gameover;