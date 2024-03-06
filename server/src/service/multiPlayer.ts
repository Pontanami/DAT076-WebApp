import { multiPlayer } from "../model/multiPlayer"
import { Player } from "../model/player";
import { PlayerService } from "./player";
import { GameService } from "./game";
import { IGameService } from "./IGameService";
import { IPLayerService } from "./IPlayerService";
import { IMultiplayerService } from "./IMultiplayerService";

export class multiPlayerService implements IMultiplayerService {

    gameService: IGameService = GameService.getInstance();
    playerService: IPLayerService = PlayerService.getInstance();
    mpGames: multiPlayer[] = [];

    /** @inheritdoc */
    async createMultiPlayerGame(hostId: number): Promise<multiPlayer> {

        let host = hostId
        let game = await this.gameService.createGame()
        if (host && game) {
            let newMultiSession = {
                host: host,
                players: [],
                game: game,
            }

            this.mpGames.push(newMultiSession);

            return JSON.parse(JSON.stringify(newMultiSession))
        }
        throw new Error("Something went wrong when creating the multiplayer");
    }

    /** @inheritdoc */
    async joinMultiPlayerGame(gameId: number, playerId: number): Promise<boolean> {

        let player = await this.playerService.getPlayer(playerId)
        let game = this.mpGames.find(mpGame => mpGame.game.id === gameId);
        if (!player) {
            throw new Error("Player Not found!");
        } else if (!game) {
            throw new Error("Game not found!");
        }
        game.players.push(player);

        return true;
    }

    /** @inheritdoc */
    async getPlayers(gameId: number): Promise<Player[]> {
        let game = this.mpGames.find(mpGame => mpGame.game.id === gameId);
        if (!game) {
            throw new Error("Game not found!");
        }
        return JSON.parse(JSON.stringify(game.players));
    }
}



