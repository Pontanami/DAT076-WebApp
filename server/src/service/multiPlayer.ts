import { multiPlayer } from "../model/multiPlayer"
import { Player } from "../model/player";
import { PlayerService } from "./player";
import { GameService } from "./game";

export class multiPlayerService{

    sessionService = new GameService();
    playerService = PlayerService.getInstance();
    mpSession ?: multiPlayer 
    
    async createMultiPlayerGame(hostId: number) : Promise<multiPlayer>{
       
        let host = await this.playerService.getPlayer(hostId);
        let game = await this.sessionService.createGame()
        if(host && game){
            let newMultiSession = {
                host : host, 
                players : [],
                game : game
            }

            this.mpSession = newMultiSession;
        
            return JSON.parse(JSON.stringify(this.mpSession))
        }
        throw new Error("Somehting went wrong when creating the session");
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