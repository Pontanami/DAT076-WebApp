import './leaderboard.css';
import React, { useEffect, useState } from 'react';
import BackButton from './backbutton';

interface Player{
    id : number,
    name : string,
    score : number
}

function Leaderboard() {

    const [playerList, setPlayerList] = useState<Player[]>([]);

    async function updatePlayers() {
        setTimeout(async () => {
            try {
              const response = await axios.get<Player[]>("http://localhost:8080/leaderboard/players");
              const newPlayer : Player[] = response.data;
              // TODO Check that tasks is a list of Tasks
              setPlayerList(newPlayer);
            } catch (error : any) {
              console.log(error)
            }
          }, 1000);
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
            {/*
                <section className="row">
                <i className=" col-2 bi bi-person-fill icon" style={{color: "black"}}></i>
                <div className="col-5 colTitle">
                <strong>Player Name</strong>
                </div>
                <div className="col-5 colTitle">
                <strong>Score</strong>
                </div>
                <hr className="hr-thick" style={{opacity: 1}}></hr>
            </section>
            <section className="row">
                <strong className="col-1 colTitle">1:</strong>
                <i className=" col-1 bi bi-person-fill icon" style={{color: "black"}}></i>
                <div className="col-5 colTitle">
                <strong>John</strong>
                </div>
                <div className="col-5 colTitle">
                <strong>21</strong>
                </div>
                <hr></hr>
            </section>
            <section className="row">
                <strong className="col-1 colTitle">2:</strong>
                <i className=" col-1 bi bi-person-fill icon" style={{color: "black"}}></i>
                <div className="col-5 colTitle">
                <strong>Person</strong>
                </div>
                <div className="col-5 colTitle">
                <strong>10</strong>
                </div>
                <hr></hr>
            </section>
            <section className="row">
                <strong className="col-1 colTitle">3:</strong>
                <i className=" col-1 bi bi-person-fill icon" style={{color: "black"}}></i>
                <div className="col-5 colTitle">
                <strong>Person2</strong>
                </div>
                <div className="col-5 colTitle">
                <strong>3</strong>
                </div>
                <hr></hr>
            </section>
            */}
        
                <LeaderboardPlayer players = {playerList}/>

            </div>
        </section>
    </div>
  );
}



function LeaderboardPlayer({ players } : {players : Player[]}){
    return (
        
        <section className="row">
            {
                players.map((player : Player) =>
                    <>
                    <strong className="col-1 colTitle">1:</strong>
                    <i className=" col-1 bi bi-person-fill icon"></i>
                    <div className="col-5 colTitle">
                        <strong>{player.name}</strong>
                    </div>
                    <div className="col-5 colTitle">
                            <strong>{player.score}</strong>
                    </div>
                    <hr></hr>
                    </>
                )
            }
        </section>    
    )
}

export default Leaderboard;