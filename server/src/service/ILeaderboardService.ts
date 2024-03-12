import { Player } from "../model/player";

export interface ILeaderboardService {

    /**
     * Asynchronously gets the list of players in the leaderboard from the database.
     * 
     * @returns {Promise<Player[]>} - Returns the list of players in the leaderboard.
     */
    getPlayerEntries(): Promise<Player[]>;

    /**
     * Requests a change to the leaderboard for the given player. The player is added if they are not already on the leaderboard, 
     * or their score is updated if they are already on the leaderboard and the new score is higher. (Bad name?)
     * @param id - The id of the player to change the leaderboard for.
     * @returns {Promise<Player[]>} - Returns the updated list of player in the leaderboard from the database.
     */
    changeLeaderboard(id: number): Promise<Player[]>;
}
