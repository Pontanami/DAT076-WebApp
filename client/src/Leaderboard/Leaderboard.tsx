import './leaderboard.css';
import { useEffect, useState } from 'react';
import BackButton from '../backbutton';
import axios from 'axios';
import { hostPort } from '../hostPort';
import DisplayLeaderboard from './DisplayLeaderboard';
import Player from '../IPlayer';

/**
 * Component for creating the leaderboard by by fetching the leaderboard players and calling DisplayLeaderboard
 * @param errorHandler - function that takes an error and displays it correctly
 * @returns a displayable Leaderboard
 */
function Leaderboard({ errorHandler }: { errorHandler: (error: any) => void }) {

    const [playerList, setPlayerList] = useState<Player[]>([]);

    async function fetchLeaderboardPlayers() {
        try {
            const response = await axios.get<Player[]>(`http://${hostPort}:8080/leaderboard/players`);
            const newPlayer: Player[] = response.data;
            newPlayer.forEach(player => {
                if (typeof (player.id) !== "number" || typeof (player.name) !== "string" || typeof (player.score) !== "number") {
                    console.log("Input to player is of wrong type")
                }
            });
            setPlayerList(newPlayer);
        } catch (error: any) {
            errorHandler(error);
        };
    }

    useEffect(() => {
        fetchLeaderboardPlayers();
    }, []);

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