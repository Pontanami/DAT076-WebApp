import {Player} from "../model/player";

export class PlayerService{
    private players : Player[] = [];

    async createPlayer(name: string): Promise<Player>{
        let newPlayer : Player = {
            name: name,
            id : Date.now(),
            score : 0
        }
        this.players.push(newPlayer)
        return { ... newPlayer};
    }

    async updatePlayerScore(id: number, score : number) : Promise<Player | undefined>{
        let player = await this.getPlayer(id)
        if(!player)
            return;
        player.score = score
        return player;
    }

    async getPlayer(id: number) : Promise<Player | undefined>{
        console.log(`id of searched player ${id}`)
        console.log(`All players ${this.players}`)
        let player = this.players.find(players => players.id = id);
       
        if(!player)
            return;
        return {...player}
    }

    async getPlayers() : Promise<Player[]>{
        return JSON.parse(JSON.stringify(this.players))
    }
}