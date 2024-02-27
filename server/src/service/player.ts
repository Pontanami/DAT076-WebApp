import { Player } from "../model/player";

export class PlayerService {
    players: Player[] = [];

    private static instance: PlayerService;

    public static getInstance(): PlayerService {
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }

    async createPlayer(id: number, name: string): Promise<Player> {
        let newPlayer: Player = {
            id: id,
            name: name,
            score: 0
        }
        this.players.push(newPlayer)
        return newPlayer;
    }

    async updatePlayerScore(id: number): Promise<Player | undefined> {
        let player = await this.getPlayer(id);
        if (!player)
            return;

        player.score += 1;
        return player;
    }

    async getPlayer(id: number): Promise<Player> {
        let player = this.players.find(player => player.id === id);
        if (!player)
            throw new Error("Player Not found!");

        return player
    }

    async getPlayerByName(name: string): Promise<Player | undefined> {
        let player = this.players.find(player => player.name === name);
        if (!player)
            return;
        return player
    }

    async getPlayers(): Promise<Player[]> {
        return JSON.parse(JSON.stringify(this.players))
    }

    async resetPlayerScore(playerId: number): Promise<Player> {
        let player = await this.getPlayer(playerId)
        player.score = 0;
        return player;
    }
}