import { Leaderboard } from "../model/leaderboard";
import { Player } from "../model/player";

export interface ILeaderboardService {

    getPlayerEntries() : Promise<Player[]>;

    getNumberOfEntries() : Promise<number>;

    changeLeaderboard(id: number) : Promise<Player[]>;
}
