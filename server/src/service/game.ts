import { Course } from "../model/course";
import { Game } from "../model/game"
import { CourseService } from "./course";
import { PlayerService } from "./player";
import { IPLayerService } from "./IPlayerService";
import { IGameService } from "./IGameService";

export class GameService implements IGameService {
    games: Game[] = [];

    playerService: IPLayerService = PlayerService.getInstance();
    courseService = CourseService.getInstance();

    private static instance: GameService;

    /**
     * Method for getting the singleton instance of the GameService
     * 
     * @returns {GameService} - Returns the instance of the GameService.
     */
    public static getInstance(): GameService {
        if (!GameService.instance) {
            GameService.instance = new GameService();
        }
        return GameService.instance;
    }

    /** @inheritdoc */
    async createGame(): Promise<Game> {
        let questions: Course[] = await this.retrieveQuestions();
        let pin: number = await this.createGamePin();
        let newGame: Game = {
            id: pin,
            questions: questions,
        }
        this.games.push(newGame);
        return JSON.parse(JSON.stringify(newGame));
    }

    /** @inheritdoc */
    async getGame(gameId: number): Promise<Game> {
        let game = this.games.find(game => game.id === gameId);
        if (!game)
            throw new Error("No game matches the id");;

        return game;
    }

    /** @inheritdoc */
    async getGameQuestions(gameId: number): Promise<Course[]> {
        let game = await this.getGame(gameId)
        return JSON.parse(JSON.stringify(game.questions))
    }

    /** @inheritdoc */
    async getCurrentQuestions(gameId: number): Promise<[Course, Course]> {
        let questions = await this.getGameQuestions(gameId)
        return [questions[0], questions[1]]
    }

    /** @inheritdoc */
    async startNextRound(id: number): Promise<[Course, Course]> {
        let game = await this.getGame(id);
        game.questions.shift();
        return this.getCurrentQuestions(id)
    }

    /**
     * Asynchronously creates a new game pin and adds it to a list in the singleton.
     * @returns 
     */
    private async createGamePin(): Promise<number> {
        let newPin: number = await this.generatePin();
        if (this.games.find(game => game.id === newPin)) {
            return this.createGamePin();
        }
        return newPin;
    }

    /**
     * Asynchronously generates a new pin with random numbers: PJS 1024
     * @returns {Promise<number>} - Returns a new pin.
     */
    private async generatePin(): Promise<number> {
        const min = 100000; // Minimum six-digit number (inclusive)
        const max = 999999; // Maximum six-digit number (inclusive)
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber;
    }

    /**
     * Asynchronously retrieves a list of questions from the course service and shuffles them.
     * @returns {Promise<Course[]>} - Returns a list of questions.
     */
    private async retrieveQuestions(): Promise<Course[]> {
        let questions = await this.courseService.getListOfCourses()
        questions.sort(() => Math.random() - 0.5);
        return questions;
    }
}