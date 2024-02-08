import { PlayerService } from "./player";
import { singlePlayer } from "../model/singlePlayer";
import { SessionService } from "./session";
import { CourseService } from "./course";

export class singePlayerService{

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

    async checkAnswer(courseClickedId: string, course2Id: string, playerId : number){
        let courseService = CourseService.getInstance();
        let isCorrect = await courseService.checkAnswer(courseClickedId, course2Id)

        if(isCorrect){
            //Ska metoden ens ta in en score? Det blir lite sus
            let player =  await this.playerService.getPlayer(playerId)

            if(player)
                this.playerService.updatePlayerScore(player.id)
        }
        else
            console.log("Game over")
            //Quit game
    }

}