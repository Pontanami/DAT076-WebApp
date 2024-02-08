import { PlayerService } from "./player";
import { singlePlayer } from "../model/singlePlayer";
import { SessionService } from "./session";
import { CourseService } from "./course";

export class singlePlayerService{

    sessionService = new SessionService();
    playerService = PlayerService.getInstance();

    async createSinglePlayerGame(playerId : number) : Promise<singlePlayer | undefined>{

        let player = await this.playerService.getPlayer(playerId);
        let session = await this.sessionService.createSession()

        if(!playerId || !session)
            return undefined;

        let newSingleSession = {
            player : player,
            session : session
        }
        return JSON.parse(JSON.stringify(newSingleSession))
    }
}