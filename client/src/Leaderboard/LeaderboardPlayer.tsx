import Player from "../IPlayer";
import './leaderboard.css';

/**
 * Component for creating a player-entry on the leaderboard
 * @param player - the player we want to display
 * @param index - the index (rank) in the leaderboard 
 * @returns a displayable player
 */
function LeaderboardPlayer({ player, index } : {player : Player, index : number}){

    
    return (
        <div className="playerEntry" key={player.id}>
            <div>
                <strong>{index}</strong>
                <strong>{player.name}</strong>
                <strong>{player.score}</strong>
            </div>
        </div>
    );
}

export default LeaderboardPlayer