import { Course } from "../model/course";
import { CourseService } from "./course";
import { PlayerService } from "./player";
import { singlePlayerService } from "./singlePlayer";

test("If a player is created it should be in the list of players", async () => {
    let courseService = new CourseService();
    let SinglePlayerService = new singlePlayerService()
    let playerService =  PlayerService.getInstance();

    let player = await playerService.createPlayer("Jon")

    let course1: Course = await courseService.createCourse("ABC123", "test1", 50);
    let course2: Course = await courseService.createCourse("ABC124", "test2", 50);
    let course3: Course = await courseService.createCourse("ABC125", "test3", 50);
    let course4: Course = await courseService.createCourse("ABC126", "test4", 50);

    let SpGameId = await SinglePlayerService.createSinglePlayerGame(player.id)

    let gameService = await SinglePlayerService.getGameService()
    let questions = await gameService.getGameQuestions(SpGameId)

    let currentquestions : [Course, Course] = await gameService.getCurrentQuestions(SpGameId)

    expect(currentquestions).toEqual([questions[0], questions[1]])
    gameService.gameUpdate(player.id, SpGameId)
    expect(currentquestions).toEqual([questions[1], questions[2]])
    gameService.gameUpdate(player.id, SpGameId)
    expect(currentquestions).toEqual([questions[2], questions[3]])
    gameService.gameUpdate(player.id, SpGameId)
    expect(currentquestions).toEqual([questions[3], questions[4]])

});