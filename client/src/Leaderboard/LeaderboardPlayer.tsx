import Player from "../IPlayer";
import './leaderboard.css';

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