import { PlayerService } from "./player";
import { singePlayer } from "../model/singlePlayer";

export class singePlayerService{

    async createSinglePlayerGame(playerId : number) : Promise<SinglePlayer | undefined>{

        let playerService = PlayerService.getInstance();
        let player = playerService.getPlayer(playerId) 

        if(!playerId)
            return undefined;

        let newSingleSession = {
            player : player
        }

        return JSON.parse(JSON.stringify(newSingleSession))
    }
}