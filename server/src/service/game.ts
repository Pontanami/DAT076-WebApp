import { Course } from "../model/course";
import { Player } from "../model/player";
import { Game } from "../model/game";
import { CourseService } from "./course";
import { PlayerService } from "./player";

export class GameService {
  games: Game[] = [];

  playerService = PlayerService.getInstance();
  courseService = CourseService.getInstance();

  async createGame(): Promise<Game> {
    let questions = await this.courseService.getListOfCourses();
    questions.sort(() => Math.random() - 0.5);

    let newGame: Game = {
      id: Date.now(),
      questions: questions,
    };
    this.games.push(newGame);
    return JSON.parse(JSON.stringify(newGame));
  }

  async getGame(gameId: number): Promise<Game> {
    let game = this.games.find((game) => game.id === gameId);
    if (!game) throw new Error("No game matches the id");

    return game;
  }
  async getAllGames(): Promise<Game[]> {
    return JSON.parse(JSON.stringify(this.games));
  }

  async addQuestion(gameId: number, code: string): Promise<Game | undefined> {
    let game = await this.getGame(gameId);
    let course = await this.courseService.getCourse(code);
    if (!game || !course) throw new Error("Game or course does not exist");

    game.questions.push(course);

    return game;
  }

  async getGameQuestions(gameId: number): Promise<Course[]> {
    let game = await this.getGame(gameId);
    return JSON.parse(JSON.stringify(game.questions));
  }

  async gameUpdate(playerId: number, gameId: number) {
    await this.playerService.updatePlayerScore(playerId);
    await this.startNextRound(gameId);
  }

  async getCurrentQuestions(gameId: number): Promise<[Course, Course]> {
    let questions = await this.getGameQuestions(gameId);
    if (!questions) throw new Error("Game does not exist!");

    return [questions[0], questions[1]];
  }

  private async startNextRound(id: number): Promise<[Course, Course]> {
    let game = await this.getGame(id);
    game.questions.shift();
    return this.getCurrentQuestions(id);
  }
}
