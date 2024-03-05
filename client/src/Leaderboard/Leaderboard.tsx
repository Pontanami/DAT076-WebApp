import './leaderboard.css';
import React, { useEffect, useState } from 'react';
import BackButton from '../backbutton';
import axios from 'axios';
import LeaderboardPlayer from './LeaderboardPlayer';
import { hostPort } from '../hostPort';
import DisplayLeaderboard from './DisplayLeaderboard';

interface Player {
    id: number,
    name: string,
    score: number
}


function Leaderboard({ errorHandler }: { errorHandler: (error: any) => void }) {

    const [playerList, setPlayerList] = useState<Player[]>([]);

    async function updatePlayers() {
        try {
            const response = await axios.get<Player[]>(`http://${hostPort}:8080/leaderboard/players`);
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
    /*
        async function addMockPlayer() {
            try {
                const mockData = { name: "mock" };
                const response = await axios.post(`http://${hostPort}:8080/player`, mockData);
                const mockPlayer: Player = response.data;
                await axios.post<Player>(`http://${hostPort}:8080/leaderboard`, mockPlayer);
                updatePlayers();
            } catch (error: any) {
                errorHandler(error);
            };
        }
        */

    return (
        <div className="Leaderboard">
            <BackButton />
            <section className="text-center">
                <h2>Leaderboard</h2>
                <DisplayLeaderboard
                    playerList={playerList}
                />
            </section>
        </div>
    );
}



export default Leaderboard;