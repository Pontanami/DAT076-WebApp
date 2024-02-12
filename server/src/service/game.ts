import { Course } from "../model/course";
import { Player } from "../model/player";
import { Game } from "../model/game"
import { CourseService } from "./course";
import { PlayerService } from "./player";

export class GameService{
    games : Game[] = [];

    playerService = PlayerService.getInstance();
    courseService = CourseService.getInstance();
    //vara kvar
    async createGame(): Promise<Game>{

        let questions = await this.courseService.getListOfCourses()

        let newGame : Game = {
            id : Date.now(),
            questions : questions,
        }
        this.games.push(newGame);
        return JSON.parse(JSON.stringify(newGame));
    }
    //Multi
    
    //Multi
    
    //vara kvar/ta bort
    async getGame(gameId: number): Promise<Game | undefined> {
        let game = this.games.find(game => game.id === gameId);
        if(!game)
            return undefined;

        return game;
    }
    //vara kvar/bort
    async getAllGames(): Promise<Game[]> {
        return JSON.parse(JSON.stringify(this.games));
    }
    //vara kvar
    async addQuestion(gameId: number, code: string) : Promise<Game | undefined>{
        let game = await this.getGame(gameId)
        let course = await this.courseService.getCourse(code)
        if(!game || !course)
            return undefined;
        
        game.questions.push(course);
        
        return game;
    }
    //vara kvar
    async getGameQuestions(gameId : number) : Promise<Course[] | undefined>{
        let game = await this.getGame(gameId)
        if(!game)
            return undefined;

        return JSON.parse(JSON.stringify(game.questions))
    }

    async checkAnswer(courseClickedId: string, course2Id: string, playerId : number){
        let courseService = CourseService.getInstance();
        let isCorrect = await courseService.checkAnswer(courseClickedId, course2Id)

        if(isCorrect){
            let player =  await this.playerService.getPlayer(playerId)
            if(player)
                await this.playerService.updatePlayerScore(player.id)
        }
        else
            console.log("Game over")
            //Quit game
    }

    async getCurrentQuestions(gameId : number) : Promise<[Course, Course]>{
        let game = await this.getGameQuestions(gameId)
        if(!game)
            throw new Error("Game does not exist!");

        return [game[0], game[1]]            
    }

}