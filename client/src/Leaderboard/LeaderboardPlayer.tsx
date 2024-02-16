import Player from "../IPlayer";

function LeaderboardPlayer({ player, index } : {player : Player, index : number}){

    
    return (
        <div className="playerEntry" key={player.id}>
            <strong className="">{index} {player.name} {player.score}</strong>
        </div>
    );
}

export default LeaderboardPlayer