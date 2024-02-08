import { Mp } from "../model/Mp"
import { Player } from "../model/player";
import {Session} from "../model/session";
import { CourseService } from "./course";
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
            return JSON.parse(JSON.stringify(newMultiSession))
        }
        return undefined;
    }

    async addPlayerToSession(sessionId: number, playerId: number): Promise<Session | undefined>{
        let session = await this.sessionService.getSession(sessionId);
        let player = await this.playerService.getPlayer(playerId)
        if (!session || !player)
            return undefined;
        
        this.mpSession.players.push(player);

        return session;
    }

    async getSessionPlayers(sessionId: number): Promise<Player[] | undefined> {
        this.mpSession.players

        if(!session)
            return undefined;

        return JSON.parse(JSON.stringify(this.players));
    }

    wrongAnswer(): Promise<void> {
        console.log("Do something when we have the wrong answer")
        throw new Error("Method not implemented.");
    }
}