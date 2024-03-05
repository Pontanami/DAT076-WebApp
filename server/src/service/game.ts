import { Course } from "../model/course";
import { Player } from "../model/player";
import { Game } from "../model/game"
import { CourseService } from "./course";
import { PlayerService } from "./player";

export class GameService{
    games : Game[] = [];
    gamePins: number[] = [];

    playerService = PlayerService.getInstance();
    courseService = CourseService.getInstance();

    private static instance: GameService;

    public static getInstance(): GameService {
        if (!GameService.instance) {
            GameService.instance = new GameService();
        }
        return GameService.instance;
    }

    //vara kvar
    async createGame(): Promise<Game>{

        let questions = await this.courseService.getListOfCourses()
        questions.sort(() => Math.random() - 0.5);
        let pin: number = await this.createGamePin();

        let newGame : Game = {
            id : pin,
            questions : questions,
        }
        this.games.push(newGame);
        return JSON.parse(JSON.stringify(newGame));
    }

    //vara kvar/ta bort
    async getGame(gameId: number): Promise<Game> {
        let game = this.games.find(game => game.id === gameId);
        if(!game)
            throw new Error("No game matches the id");;

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
             throw new Error("Game or course does not exist");
        
        game.questions.push(course);
        
        return game;
    }
    //vara kvar
    async getGameQuestions(gameId : number) : Promise<Course[]>{
        let game = await this.getGame(gameId)
        return JSON.parse(JSON.stringify(game.questions))
    }

    //denna kanske inte egentligen borde ligga här
    /*
    async gameUpdate(playerId : number, gameId: number){
        await this.playerService.updatePlayerScore(playerId)
        await this.startNextRound(gameId)
        
    }*/

    async getCurrentQuestions(gameId : number) : Promise<[Course, Course]>{
        let questions = await this.getGameQuestions(gameId)
        if(!questions)
            throw new Error("Game does not exist!");

        return [questions[0], questions[1]]            
    }

    async startNextRound(id:number): Promise<[Course, Course]>{
        let game = await this.getGame(id);
        game.questions.shift();
        return this.getCurrentQuestions(id)
    }

    //TODO: Vi kan ändra denna till att inte returnera en string så slipper vi converta i react när vi vill skicka emit
    async createGamePin(): Promise<number> {
        let newPin : number = await this.generatePin();
        if (this.gamePins.includes(newPin)){
            return this.createGamePin();
        } else {
            this.gamePins.push(newPin);
        }
        return newPin;
    }

    async generatePin(): Promise<number> {
        const min = 100000; // Minimum six-digit number (inclusive)
        const max = 999999; // Maximum six-digit number (inclusive)
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }
}