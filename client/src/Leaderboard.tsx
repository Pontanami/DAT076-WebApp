import './leaderboard.css';
import React, { useEffect, useState } from 'react';
import BackButton from './backbutton';
import axios from 'axios';

interface Player{
    id : number,
    name : string,
    score : number
}

function handleError(error : any, displayErrorMessage : (errorMessage:string) => void ){
    if(error.response){
        displayErrorMessage(error.response.status)
    }
    else if(error.request){
        displayErrorMessage("No response provided from the server")
    }
    else{
        displayErrorMessage("Error occured while processing request")
    }
}

function Leaderboard() {

    const [playerList, setPlayerList] = useState<Player[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

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
                handleError(error, displayErrorMessage) ;
            };
    }

    function displayErrorMessage(errorMessage: string){
        setErrorMessage(errorMessage)
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
            {/*<LeaderboardPlayer players = {playerList}/> denna ger infinite loop*/}
            <LeaderboardPlayer players = {playerList}/>
            </div>
        </section>
    </div>
  );
}



function LeaderboardPlayer({ players } : {players : Player[]}){

    function createPlayerEntry(player: Player, index: number) {
        return (
            <div key={player.id}>
                <strong className="col-1 colTitle">{index}</strong>
            </div>
        );
    }

    return (
        <section className="row">
            {players.map((player: Player, index: number) =>
                createPlayerEntry(player, index + 1)
            )}
        </section>
    );
}

export default Leaderboard;
