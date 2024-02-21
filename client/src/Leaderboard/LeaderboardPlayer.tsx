import Player from "../IPlayer";
import './leaderboard.css';

function LeaderboardPlayer({ player, index } : {player : Player, index : number}){

    
    return (
        <div className="playerEntry" key={player.id}>
            <div>
                <strong className="">{index}</strong>
                <strong className="">{player.name}</strong>
                <strong className="">{player.score}</strong>
            </div>
        </div>
    );
}

export default LeaderboardPlayer