import { singlePlayer } from "../model/singlePlayer";

export interface ISinglePlayerService {

    /**
    * Asynchronously creates a new single player game with the provided player.
    * 
    * @param {number} playerId - The id of the player.
    * @returns {Promise<number>} - Returns the id of the created game.
    * @throws {Error} - Throws an error if the player or session could not be created.
    */
    createSinglePlayerGame(playerId: number): Promise<number>;

    /**
    * Method for getting the single player game with the provided id.
    * 
    * @param {number} id - The id of the game.
    * @returns {Promise<PlayerService>} - Returns the player service.
    */
    getSinglePlayerGame(id: number): Promise<singlePlayer>
}