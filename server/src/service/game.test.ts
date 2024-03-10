import { Course } from "../model/course";
import { IGameService } from "./IGameService";
import { CourseService } from "./course";
import { GameService } from "./game";
import { PlayerService } from "./player";
import { singlePlayerService } from "./singlePlayer";

test("If we start a new round, the questions should be shifted one step", async () => {
    let courseService = new CourseService();
    let SinglePlayerService = new singlePlayerService()
    let playerService =  PlayerService.getInstance();

    let player = await playerService.createPlayer(1,"Jon")

    let course1: Course = await courseService.createCourse("ABC123", "Sjö","test1", 50);
    let course2: Course = await courseService.createCourse("ABC124", "Sjö","test2", 50);
    let course3: Course = await courseService.createCourse("ABC125", "Sjö","test3", 50);
    let course4: Course = await courseService.createCourse("ABC126", "Sjö","test4", 50);

    let SpGameId = await SinglePlayerService.createSinglePlayerGame(player.id)

    let gameService:IGameService = GameService.getInstance();
    let questions = await gameService.getGameQuestions(SpGameId)

    let currentquestions : [Course, Course] = await gameService.getCurrentQuestions(SpGameId)

    expect(currentquestions).toEqual([questions[0], questions[1]])
    gameService.startNextRound(SpGameId)
    expect(currentquestions).toEqual([questions[1], questions[2]])
    gameService.startNextRound(SpGameId)
    expect(currentquestions).toEqual([questions[2], questions[3]])
    gameService.startNextRound(SpGameId)
    expect(currentquestions).toEqual([questions[3], questions[4]])

});

test("createGame should succesfully create a game", async () => {
    let gameService:IGameService = GameService.getInstance();
    let game = await gameService.createGame();
    expect(game).toBeDefined();
    expect(typeof game.id).toBe("number");
    expect(typeof game.questions).toBe("object");
    expect(game.questions).toBeInstanceOf(Array<Course>);
});
