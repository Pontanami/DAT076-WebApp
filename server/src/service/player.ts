import { Player } from "../model/player";
import { IPLayerService } from "./IPlayerService";

export class PlayerService implements IPLayerService {
    players: Player[] = [];

    // It's a singleton because we don't want to store playing players in the database, but we still want to keep track of them and 
    //we don't want to create a new instance of the player service every time we want to access it.
    private static instance: PlayerService;

    /**
     * Method for getting the singleton instance of the PlayerService
     * 
     * @returns {PlayerService} - Returns the instance of the PlayerService.
     */
    public static getInstance(): PlayerService {
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }
    /** @inheritdoc */
    async createPlayer(id: number, name: string): Promise<Player> {
        let newPlayer: Player = {
            id: id,
            name: name,
            score: 0
        }
        this.players.push(newPlayer)
        return newPlayer;
    }

    /** @inheritdoc */
    async updatePlayerScore(id: number): Promise<Player> {
        let player = await this.getPlayer(id);
        player.score += 1;
        return player;
    }

    /** @inheritdoc */
    async getPlayer(id: number): Promise<Player> {
        let player = this.players.find(player => player.id === id);
        if (!player)
            throw new Error("Player not found!");

        return player
    }

    /** @inheritdoc */
    async getPlayers(): Promise<Player[]> {
        return JSON.parse(JSON.stringify(this.players))
    }

    /** @inheritdoc */
    async resetPlayerScore(playerId: number): Promise<Player> {
        let player = await this.getPlayer(playerId)
        player.score = 0;
        return player;
    }
}