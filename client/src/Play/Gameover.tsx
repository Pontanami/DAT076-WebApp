import { Link } from "react-router-dom";

/**
 * Component for showing the game over screen
 * @returns a displayable gameover screen
 */
function Gameover() {
    
    /**
     * Function for generating a random gif to be displayed when a user has lost
     * @returns a path to the file we want to display
     */
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
                <Link to="/home" style={{textDecoration: 'none'}}><button className="homeButton" type="button">Home</button></Link>
                <Link to="/leaderboard" style={{textDecoration: 'none'}}><button className="homeButton" type="button">Leaderboard</button></Link>
            </div>
        </div>
    )

    
}

export default Gameover;