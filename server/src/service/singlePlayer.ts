import { singlePlayer } from "../model/singlePlayer";
import { IGameService } from "./IGameService";
import { IPLayerService } from "./IPlayerService";
import { GameService } from "./game";
import { PlayerService } from "./player";
import { ISinglePlayerService } from "./ISinglePlayerService";

export class singlePlayerService implements ISinglePlayerService {
  private singlePlayerGames: singlePlayer[] = [];

  private gameService: IGameService = GameService.getInstance();
  private playerService: IPLayerService = PlayerService.getInstance();

  /** @inheritdoc */
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

  /** @inheritdoc */
  async getSinglePlayerGame(id: number): Promise<singlePlayer> {
    let game = this.singlePlayerGames.find((Spgame) => Spgame.game.id === id);

    if (!game) throw new Error("No matching single player game");

    return game;
  }
}
