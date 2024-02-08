import { PlayerService } from "./player";
import { singlePlayer } from "../model/singlePlayer";
import { SessionService } from "./session";
import { CourseService } from "./course";
import { SService } from "./S";

export class SpService extends SService{


    sessionService = new SessionService();
    playerService = PlayerService.getInstance();

    async createSinglePlayerGame(playerId : number) : Promise<singlePlayer | undefined>{

        let player = await this.playerService.getPlayer(playerId);

        if(!playerId)
            return undefined;

        await super.createSession()

        let newSingleSession = {
            player : player
        }
        return JSON.parse(JSON.stringify(newSingleSession))
    }

    wrongAnswer(): Promise<void> {
        //Do something when the user gets a question wrong, quit?
        throw new Error("Method not implemented.");
    }
}