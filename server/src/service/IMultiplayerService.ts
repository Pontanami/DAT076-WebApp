import { multiPlayer } from "../model/multiPlayer";
import { Player } from "../model/player";

export interface IMultiplayerService {

    /**
     * Asynchronously creates a new multiplayer game with the provided host.
     * @param hostId - The id of the host.
     * @returns {Promise<multiPlayer>} - Returns the created multiplayer game.
     */
    createMultiPlayerGame(hostId: number): Promise<multiPlayer>

    /**
     * Asynchronously joins a multiplayer game with the provided game id and player id.
     * @param gameId - The id of the game.
     * @param playerId - The id of the player.
     * @returns {Promise<boolean>} - Returns true if the player was successfully added to the game, otherwise false.
     */
    joinMultiPlayerGame(gameId: number, playerId: number): Promise<boolean>

    /**
    * Asynchronously gets the players in the game with the provided id.
    * @param gameId - The id of the game.
    * @returns {Promise<Player[]>} - Returns the players in the game.
    */
    getPlayers(gameId: number): Promise<Player[]>;
}