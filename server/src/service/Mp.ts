import { Mp } from "../model/Mp"
import { Player } from "../model/player";
import { PlayerService } from "./player";
import { SessionService } from "./session";
import { SService } from "./S"

export class MpService extends SService{
    

    sessionService = new SessionService();
    playerService = PlayerService.getInstance();
    mpSession ?: Mp 
    
    async createMultiPlayerGame(hostId: number) : Promise<Mp | undefined>{
        let host = await this.playerService.getPlayer(hostId);

        if(host){
            let newMultiSession = {
                host : host, 
                players : []
            }
            this.mpSession = newMultiSession
            await super.createSession()
            return JSON.parse(JSON.stringify(newMultiSession))
            
        }
        return undefined;
    }

    async addPlayerToSession(playerId: number): Promise<Mp | undefined>{
        let player = await this.playerService.getPlayer(playerId)
        if (!this.mpSession || !player)
            return undefined;
        
        this.mpSession.players.push(player);

        return this.mpSession;
    }

    async getSessionPlayers(): Promise<Player[] | undefined> {
        if(!this.mpSession)
            return undefined;

        return JSON.parse(JSON.stringify(this.mpSession.players));
    }

    wrongAnswer(): Promise<void> {
        console.log("Do something when we have the wrong answer")
        throw new Error("Method not implemented.");
    }
}