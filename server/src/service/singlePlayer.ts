import { PlayerService } from "./player";
import { singlePlayer } from "../model/singlePlayer";
import { GameService } from "./game";
import { CourseService } from "./course";
import { Player } from "../model/player";
import { Course } from "../model/course";
import { throws } from "assert";

export class singlePlayerService{

    singlePlayerGames : singlePlayer[] = [] 

    gameService = new GameService();
    playerService = PlayerService.getInstance();

    async createSinglePlayerGame(playerId : number) : Promise<[Course, Course]>{

        let player = await this.playerService.getPlayer(playerId);
        let game = await this.gameService.createGame()

        if(!player||!game)
            throw new Error("Player or Session could not be created");

        let newSingleGame = {
            player : player,
            game : game
        }

        this.singlePlayerGames.push(newSingleGame)

        let currentQuestions = await this.gameService.getCurrentQuestions(game.id);

        return currentQuestions
    }

    async getCurrentQuestions(sessionID : number) : Promise<[Course, Course]>{
        return this.gameService.getCurrentQuestions(sessionID)
    }
}