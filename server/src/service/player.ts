import {Player} from "../model/player";

export class PlayerService{
    //private currentPlayer : Player;

    async createPlayer(name: string): Promise<Player>{
        let newPlayer : Player = {
            name: name,
            id : Date.now(),
            score : 0
        }

        //this.currentPlayer = new Player(name);

        return { ... newPlayer};
    }

}