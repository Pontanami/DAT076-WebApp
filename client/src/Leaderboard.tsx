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

    async function addMockPlayer() {
        try {
            const mockData = { name: "mock"};
            const response = await axios.post("http://localhost:8080/player", mockData);
            const mockPlayer : Player = response.data;
            await axios.post<Player>("http://localhost:8080/leaderboard", mockPlayer);
            updatePlayers();
          } catch (error : any) {
              handleError(error, displayErrorMessage) ;
          };
    }

  return (
    <div className="Leaderboard">
        <BackButton/>
        <section className="text-center">
            <h2>Leaderboard</h2>
            <div id="leaderboard">
            <div className="playerEntry">
                <strong className="">Rank</strong>
                <strong className="">Name</strong>
                <strong className="">Score</strong>
            </div>
                <LeaderboardPlayer players = {playerList}/>
            </div>
        </section>
        <button onClick={addMockPlayer}>Add mock player</button>
    </div>
  );
}



function LeaderboardPlayer({ players } : {players : Player[]}){

    function createPlayerEntry(player: Player, index: number) {
        return (
            <div className="playerEntry" key={player.id}>
                <strong className="">{index} {player.name} {player.score}</strong>
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
