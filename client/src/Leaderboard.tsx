import './leaderboard.css';
import React, { useEffect, useState } from 'react';
import BackButton from './backbutton';
import axios from 'axios';

interface Player{
    id : number,
    name : string,
    score : number
}

function Leaderboard() {

    const [playerList, setPlayerList] = useState<Player[]>([]);

    async function updatePlayers() {
            try {
              const response = await axios.get<Player[]>("http://localhost:8080/leaderboard/players");
              const newPlayer : Player[] = response.data;
              newPlayer.forEach(player => {
                  if(typeof(player.id) !== "number" || typeof(player.name) !== "string" || typeof(player.score) !== "number"){
                    console.log("Input to player is of wrong type")
                  }
              });
              // TODO Check that tasks is a list of Tasks
              setPlayerList(newPlayer);
            } catch (error : any) {
              console.log(error)
            };
    }
    
    useEffect(() => {
        updatePlayers();
    }, []);  

  return (
    <div className="Leaderboard">
        <BackButton/>
        <section className="text-center">
            <h1 style={{color: "whitesmoke"}}>Leaderboard</h1>
            <div className="container text-center" id="leaderboard">
                <LeaderboardPlayer players = {playerList}/>
            </div>
        </section>
    </div>
  );
}



function LeaderboardPlayer({ players } : {players : Player[]}){
    const [index, setIndex] = useState<number>(1)

    function createPlayerEntry(player: Player) {
        return ( <div>
                    <strong className="col-1 colTitle">{index}</strong>
                    <i className=" col-1 bi bi-person-fill icon"></i>
                    <div className="col-5 colTitle">
                        <strong>{player.name}</strong>
                    </div>
                    <div className="col-5 colTitle">
                        <strong>{player.score}</strong>
                    </div>
                    <hr></hr>
                </div>
        );
    }

    return (
        <section className="row">
            {
                players.map((player : Player) =>
                    createPlayerEntry(player)
                    //Detta ser lite fishy ut men det kanske är korrekt
                    ,setIndex(index => index + 1)
                )
            }
        </section>    
    )
}

export default Leaderboard;