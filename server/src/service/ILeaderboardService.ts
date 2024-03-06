import { Player } from "../model/player";

export interface ILeaderboardService {

    /**
     * Asynchronously gets the list of players in the leaderboard from the database.
     * 
     * @returns {Promise<Player[]>} - Returns the list of players in the leaderboard.
     */
    getPlayerEntries(): Promise<Player[]>;

    /**
    * Asynchronously gets the number of entries in the leaderboard in the database.
    * 
    * @returns {Promise<number>} - Returns the number of entries in the leaderboard.
    */
    getNumberOfEntries(): Promise<number>;

    /**
     * Requests a change to the leaderboard for the given player. The player is added if they are not already on the leaderboard, 
     * or their score is updated if they are already on the leaderboard and the new score is higher. (Bad name?)
     * @param id - The id of the player to change the leaderboard for.
     * @returns {Promise<Player[]>} - Returns the updated list of player in the leaderboard from the database.
     */
    changeLeaderboard(id: number): Promise<Player[]>;
}
