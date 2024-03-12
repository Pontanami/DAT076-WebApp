import { Course } from "../model/course";
import { ICourseService } from "./ICourseService";
import { IGameService } from "./IGameService";
import { CourseService } from "./course";
import { GameService } from "./game";
import { PlayerService } from "./player";
import { IPLayerService } from "./IPlayerService";
import { singlePlayerService } from "./singlePlayer";

let courseService: ICourseService;
let gameService: IGameService;
let playerService: IPLayerService;
let course1, course2, course3, course4: Course;

beforeAll(async () => {
    courseService = CourseService.getInstance();
    gameService = GameService.getInstance();
    playerService = PlayerService.getInstance();
    course1 = await courseService.createCourse("ABC123", "Sjö","test1", 60);
    course2 = await courseService.createCourse("ABC124", "Sjö","test2", 70);
    course3 = await courseService.createCourse("ABC125", "Sjö","test3", 30);
    course4 = await courseService.createCourse("ABC126", "Sjö","test4", 20);
});

test("If we start a new round, the questions should be shifted one step", async () => {

    let game = await gameService.createGame()
    let questions = await gameService.getGameQuestions(game.id)

    let currentquestions : [Course, Course] = await gameService.getCurrentQuestions(game.id)

    expect(currentquestions).toEqual([questions[0], questions[1]])
    gameService.startNextRound(game.id)
    currentquestions  = await gameService.getCurrentQuestions(game.id)
    expect(currentquestions).toEqual([questions[1], questions[2]])
    gameService.startNextRound(game.id)
    currentquestions  = await gameService.getCurrentQuestions(game.id)
    expect(currentquestions).toEqual([questions[2], questions[3]])
    gameService.startNextRound(game.id)
    currentquestions  = await gameService.getCurrentQuestions(game.id)
    expect(currentquestions).toEqual([questions[3], questions[4]])

});

test("createGame should succesfully create a game", async () => {
    let game = await gameService.createGame();
    expect(game).toBeDefined();
    expect(typeof game.id).toBe("number");
    expect(typeof game.questions).toBe("object");
    expect(game.questions).toBeInstanceOf(Array<Course>);
});

test("getGame should return the game with the given id", async () => {
    let game = await gameService.createGame();
    let game2 = await gameService.getGame(game.id);
    expect(game).toEqual(game2);
});

test("getGameQuestions should return the questions of the game with the given id", async () => {
    let game = await gameService.createGame();
    let questions = await gameService.getGameQuestions(game.id);
    expect(questions).toEqual(game.questions);
});

test("getGame should throw an error if the game with the given id does not exist", async () => {
    let id = 1;
    await expect(gameService.getGame(id)).rejects.toThrow("No game matches the id");
});