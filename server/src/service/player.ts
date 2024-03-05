import {Player} from "../model/player";
import { IPLayerService } from "./IPlayerService";

export class PlayerService implements IPLayerService{
    players : Player[] = [];

    private static instance : PlayerService;

    /**
     * Method for getting the instance of the PlayerService.
     * 
     * @returns {PlayerService} - Returns the instance of the PlayerService.
     */
    public static getInstance() : PlayerService{
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }
    /**
     * Asynchronously creates a new player with the provided name and adds it to a list in the singleton.
     * 
     * @param {number} id - The id of the player.
     * @param {string} name - The name of the player.
     * @returns {Promise<Player>} - Returns the created player.
     */
    async createPlayer(id : number,name: string): Promise<Player>{
        let newPlayer : Player = {
            id :id,
            name: name,
            score : 0
        }
        this.players.push(newPlayer)
        return newPlayer;
    }

    /**
     * Asynchronously updates the score of the player with the provided id.
     * 
     * @param {number} id - The id of the player.
     * @returns {Promise<Player>} - Returns the updated player.
     * @throws {Error} - Throws an error if the player does not exist.
     */
    async updatePlayerScore(id: number) : Promise<Player>{
        let player = await this.getPlayer(id);    
        if(!player)
            throw new Error("Player does not exist");
            ;

        player.score+=1;
        return player;
    }

    /**
     * Asynchronously gets the player with the provided id.
     * 
     * @param {number} id - The id of the player.
     * @returns {Promise<Player>} - Returns the player.
     * @throws {Error} - Throws an error if the player does not exist.
     */
    async getPlayer(id: number) : Promise<Player>{
        let player = this.players.find(player => player.id === id);
        if(!player)
            throw new Error("Player Not found!");
            
        return player
    }

    /**
     * Asynchronously gets the player with the provided name.
     * 
     * @param {string} name - The name of the player.
     * @returns {Promise<Player>} - Returns the player.
     * @throws {Error} - Throws an error if the player does not exist.
     */
    async getPlayerByName(name: string) : Promise<Player | undefined>{
        let player = this.players.find(player => player.name === name);
        if(!player)
            return;
        return player
    }

    /**
     * Asynchronously gets a list of all players.
     * 
     * @returns {Promise<Player[]>} - Returns a list of all players.
     */
    async getPlayers() : Promise<Player[]>{
        return JSON.parse(JSON.stringify(this.players))
    }

    /**
     * Asynchronously resets the score of the player with the provided id.
     * 
     * @param {number} playerId - The id of the player.
     * @returns {Promise<Player>} - Returns the updated player.
     */
    async resetPlayerScore(playerId : number) : Promise<Player>{
        let player = await this.getPlayer(playerId)
        player.score = 0;
        return player;
    }
}