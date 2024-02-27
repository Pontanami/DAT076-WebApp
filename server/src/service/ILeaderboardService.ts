import { Leaderboard } from "../model/leaderboard";
import { Player } from "../model/player";

export interface ILeaderboardService {

    //getPlayerEntries returns a list of all players on the leaderboard
    getPlayerEntries() : Promise<Player[]>;

    //getNumberOfEntries returns the number of entries on the leaderboard
    getNumberOfEntries() : Promise<number>;

    //changeLeaderboard adds a player to the leaderboard or updates their score if they are already on the leaderboard and the score is higher
    changeLeaderboard(id: number) : Promise<Player[]>;
}
