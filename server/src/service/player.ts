import {Player} from "../model/player";
import { IPLayerService } from "./IPlayerService";

export class PlayerService implements IPLayerService{
    players : Player[] = [];

    private static instance : PlayerService;

    //Om vi ska ha en playerService som tar hand om alla players måste vi väl mer eller mindre ha en singleton?
    //Annars riskerar vi att skapa nya instanser där vissa spelare inte finns med
    public static getInstance() : PlayerService{
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }

    async createPlayer(id : number,name: string): Promise<Player>{
        let newPlayer : Player = {
            id :id,
            name: name,
            score : 0
        }
        this.players.push(newPlayer)
        return newPlayer;
    }

    async updatePlayerScore(id: number) : Promise<Player>{
        let player = await this.getPlayer(id);    
        if(!player)
            throw new Error("Player does not exist");
            ;

        player.score+=1;
        return player;
    }

    async getPlayer(id: number) : Promise<Player>{
        //console.log(`Searching for ${id}`)
        //console.log(`All players ${JSON.stringify(this.players)}`)
        let player = this.players.find(player => player.id === id);
        //console.log(`Found player ${JSON.stringify(player)}`)
        if(!player)
            throw new Error("Player Not found!");
            
        return player
    }

    async getPlayerByName(name: string) : Promise<Player | undefined>{
        //console.log(`Searching for ${id}`)
        //console.log(`All players ${JSON.stringify(this.players)}`)
        let player = this.players.find(player => player.name === name);
        //console.log(`Found player ${JSON.stringify(player)}`)
        if(!player)
            return;
        return player
    }

    async getPlayers() : Promise<Player[]>{
        return JSON.parse(JSON.stringify(this.players))
    }

    async resetPlayerScore(playerId : number) : Promise<Player>{
        let player = await this.getPlayer(playerId)
        player.score = 0;
        return player;
    }
}