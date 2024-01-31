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
        //this.currentPlayer = new Player(name);

        return { ... newPlayer};
    }

    async getPlayer(id: number) : Promise<Player | undefined>{
        let player = this.players.find(players => players.id = id);
        if(!player)
            return;
        return {...player}
    }
}