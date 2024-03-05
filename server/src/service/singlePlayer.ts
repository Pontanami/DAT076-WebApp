import { singlePlayer } from "../model/singlePlayer";
import { GameService } from "./game";
import { PlayerService } from "./player";

export class singlePlayerService {
  private singlePlayerGames: singlePlayer[] = [];

  private gameService = GameService.getInstance();
  private playerService = PlayerService.getInstance();

  /**
   * Asynchronously creates a new single player game with the provided player.
   * 
   * @param {number} playerId - The id of the player.
   * @returns {Promise<number>} - Returns the id of the created game.
   * @throws {Error} - Throws an error if the player or session could not be created.
   */
  async createSinglePlayerGame(playerId: number): Promise<number> {
    let player = await this.playerService.getPlayer(playerId);
    let game = await this.gameService.createGame();

    if (!player || !game) {
      throw new Error("Player or Session could not be created");
    }

    let newSingleGame = {
      player: player,
      game: game,
    };

    this.singlePlayerGames.push(newSingleGame);

    return game.id;
  }

  /**
   * Method for getting the game service composite.
   * 
   * @returns {Promise<singlePlayer[]>} - Returns a list of all single player games.
   */
  async getGameService(): Promise<GameService> {
    return this.gameService;
  }

  /**
   * Method for getting the single player game with the provided id.
   * 
   * @param {number} id - The id of the game.
   * @returns {Promise<PlayerService>} - Returns the player service.
   */
  async getSinglePlayerGame(id: number): Promise<singlePlayer> {
    let game = this.singlePlayerGames.find((Spgame) => Spgame.game.id === id);

    if (!game) throw new Error("No matching single player game");

    return game;
  }
}
