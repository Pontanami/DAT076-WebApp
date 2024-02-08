import {Player} from "../model/player";

export class PlayerService{
    players : Player[] = [];
    playerId = 1;

    private static instance : PlayerService;

    //Om vi ska ha en playerService som tar hand om alla players måste vi väl mer eller mindre ha en singleton?
    //Annars riskerar vi att skapa nya instanser där vissa spelare inte finns med
    public static getInstance() : PlayerService{
        if (!PlayerService.instance) {
            PlayerService.instance = new PlayerService();
        }
        return PlayerService.instance;
    }

    async createPlayer(name: string): Promise<Player>{
        let newPlayer : Player = {
            name: name,
            id :this.playerId,
            score : 0
        }
        this.playerId += 1;
        this.players.push(newPlayer)
        return newPlayer;
    }

    async updatePlayerScore(id: number) : Promise<Player | undefined>{
        let player = await this.getPlayer(id);    
        if(!player)
            return;

        player.score+=1;
        return player;
    }

    async getPlayer(id: number) : Promise<Player | undefined>{
        //console.log(`Searching for ${id}`)
        //console.log(`All players ${JSON.stringify(this.players)}`)
        let player = this.players.find(player => player.id === id);
        //console.log(`Found player ${JSON.stringify(player)}`)
        if(!player)
            return;
        return player
    }

    async getPlayers() : Promise<Player[]>{
        return JSON.parse(JSON.stringify(this.players))
    }
}