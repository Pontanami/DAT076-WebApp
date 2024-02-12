import { multiPlayer } from "../model/multiPlayer"
import { Player } from "../model/player";
import { PlayerService } from "./player";
import { SessionService } from "./game";

export class multiPlayerService{

    sessionService = new SessionService();
    playerService = PlayerService.getInstance();
    mpSession ?: multiPlayer 
    
    async createMultiPlayerGame(hostId: number) : Promise<multiPlayer | undefined>{
       
        let host = await this.playerService.getPlayer(hostId);
        let session = await this.sessionService.createSession()
        if(host && session){
            let newMultiSession = {
                host : host, 
                players : [],
                session : session
            }

            this.mpSession = newMultiSession;
        
            return JSON.parse(JSON.stringify(this.mpSession))
        }
        return undefined;
    }

    async addPlayerToSession(playerId: number): Promise<multiPlayer | undefined>{
        let player = await this.playerService.getPlayer(playerId)
        if (!player || !this.mpSession)
            return undefined;
        
        this.mpSession?.players.push(player)

        return this.mpSession;
    }

    async getSessionPlayers(): Promise<Player[] | undefined> {
        if(!this.mpSession)
            return undefined;

        return JSON.parse(JSON.stringify(this.mpSession.players));
    }
}