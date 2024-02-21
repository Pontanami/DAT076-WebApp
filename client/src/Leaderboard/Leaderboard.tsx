import './leaderboard.css';
import React, { useEffect, useState } from 'react';
import BackButton from '../backbutton';
import axios from 'axios';
import LeaderboardPlayer from './LeaderboardPlayer';

interface Player {
    id: number,
    name: string,
    score: number
}


function Leaderboard({ errorHandler }: { errorHandler: (error: any) => void }) {

    const [playerList, setPlayerList] = useState<Player[]>([]);

    async function updatePlayers() {
        try {
            const response = await axios.get<Player[]>("http://localhost:8080/leaderboard/players");
            const newPlayer: Player[] = response.data;
            newPlayer.forEach(player => {
                if (typeof (player.id) !== "number" || typeof (player.name) !== "string" || typeof (player.score) !== "number") {
                    console.log("Input to player is of wrong type")
                }
            });
            // TODO Check that tasks is a list of Tasks
            setPlayerList(newPlayer);
        } catch (error: any) {
            errorHandler(error);
        };
    }

    useEffect(() => {
        updatePlayers();
    }, []);

    async function addMockPlayer() {
        try {
            const mockData = { name: "mock" };
            const response = await axios.post("http://localhost:8080/player", mockData);
            const mockPlayer: Player = response.data;
            await axios.post<Player>("http://localhost:8080/leaderboard", mockPlayer);
            updatePlayers();
        } catch (error: any) {
            errorHandler(error);
        };
    }

    return (
        <div className="Leaderboard">
            <BackButton />
            <section className="text-center">
                <h2>Leaderboard</h2>
                <div id="leaderboard">
                    <div className="columnNames">
                        <strong className="">Rank</strong>
                        <strong className="">Name</strong>
                        <strong className="">Score</strong>
                    </div>
                    <section className="row">
                        {playerList.map((player: Player, index: number) =>
                            <LeaderboardPlayer player={player} index={index + 1} />
                            //createPlayerEntry(player, index + 1)
                        )}
                    </section>
                </div>
            </section>
            <button onClick={addMockPlayer}>Add mock player</button>
        </div>
    );
}



export default Leaderboard;