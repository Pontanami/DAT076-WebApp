import { multiPlayer } from "../model/multiPlayer"
import { Player } from "../model/player";
import { PlayerService } from "./player";
import { GameService } from "./game";
import { promises } from "dns";

export class multiPlayerService{

    sessionService = new GameService();
    playerService = PlayerService.getInstance();
    mpSession ?: multiPlayer 
    gamePins: string[] = [];
    
    async createMultiPlayerGame(hostId: number) : Promise<multiPlayer>{
       
        let host = hostId
        let game = await this.sessionService.createGame()
        let pin: string = await this.createGamePin();
        if(host && game){
            let newMultiSession = {
                host : host, 
                players : [],
                game : game,
                pin : pin
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

    async createGamePin(): Promise<string> {
        let newPin : string = await this.generatePin();
        if (this.gamePins.includes(newPin)){
            return this.createGamePin();
        } else {
            this.gamePins.push(newPin);
        }
        return newPin;
    }

    async generatePin(): Promise<string> {
        const min = 100000; // Minimum six-digit number (inclusive)
        const max = 999999; // Maximum six-digit number (inclusive)
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber.toString();
    }
}



