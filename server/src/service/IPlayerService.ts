import { Player } from "../model/player";

export interface IPLayerService {

     /**
     * Asynchronously gets a list of all players.
     * 
     * @returns {Promise<Player[]>} - Returns a list of all players.
     */
    getPlayers(): Promise<Player[]>;

    /**
     * Asynchronously gets the player with the provided id.
     * 
     * @param {number} id - The id of the player.
     * @returns {Promise<Player>} - Returns the player.
     * @throws {Error} - Throws an error if the player does not exist.
     */
    getPlayer(id: number): Promise<Player>;

   /**
     * Asynchronously creates a new player with the provided name and adds it to a list in the singleton.
     * 
     * @param {number} id - The id of the player.
     * @param {string} name - The name of the player.
     * @returns {Promise<Player>} - Returns the created player.
     */
    createPlayer(id: number,name: string): Promise<Player>;

   /**
     * Asynchronously updates the score of the player with the provided id.
     * 
     * @param {number} id - The id of the player.
     * @returns {Promise<Player>} - Returns the updated player.
     * @throws {Error} - Throws an error if the player does not exist.
     */
    updatePlayerScore(id: number): Promise<Player | undefined>;

    /**
     * Asynchronously resets the score of the player with the provided id.
     * 
     * @param {number} playerId - The id of the player.
     * @returns {Promise<Player>} - Returns the updated player.
     */
    resetPlayerScore(id: number): Promise<Player | undefined>;
}