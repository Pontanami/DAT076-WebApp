import { Course } from "../model/course";
import { Player } from "../model/player";
import { Game } from "../model/game";
import { CourseService } from "./course";
import { PlayerService } from "./player";
import { GameService } from "./game";
import { singlePlayerService} from "./singlePlayer";

test("If a session is created it should be in the list of sessions", async () => {
    const sessionService = new GameService();
    let createdSession = await sessionService.createGame();
    let allSessions = await sessionService.getAllGames();
    expect(allSessions.map((game: Game) => game.id)).toContain(createdSession.id);
});

test("If a session is created it should be in the list of sessions", async () => {
    const sessionService = new GameService();
    let createdSession = await sessionService.createGame();
    let recivedSession = await sessionService.getGame(createdSession.id);
    expect(recivedSession).toEqual(createdSession);
});

/*
test("If a player is added to the session it should be in the list of players for that session", async () =>{
    const playerService = PlayerService.getInstance();
    const sessionService = new SessionService();
    let createdPlayer = await playerService.createPlayer("test4");
    let createdSession = await sessionService.createSession();
    await sessionService.addPlayerToSession(createdSession.id, createdPlayer.id);
    let recivedSession = await sessionService.getSession(createdSession.id);
    expect(recivedSession?.players.map(() => createdPlayer)).toContain(createdPlayer)
})*/

test("If a question is added to the session it should be in the list of questions", async () =>{
    const sessionService = new GameService();
    const courseService = CourseService.getInstance()
    let session = await sessionService.createGame();
    let course = await courseService.createCourse("MVE655", "Flervarre", 45)
    await sessionService.addQuestion(session.id,course.code)
    let sessionQuestions = await sessionService.getGameQuestions(session.id);
    expect(sessionQuestions?.map((course: Course) => course.code)).toContain(course.code);
})

test("Game Test", async () =>{
    const sPService = new singlePlayerService();
    const courseService = CourseService.getInstance();
    const playerService = PlayerService.getInstance();
    const player = await playerService.createPlayer("singlePlaye");
    let course1 = await courseService.createCourse("MVE600", "TestA", 50);
    let course2 = await courseService.createCourse("MVE601", "TestB", 95);
    let course3 = await courseService.createCourse("MVE602", "TestC", 5);
    const game = await sPService.createSinglePlayerGame(player.id);
    if(!game){
        return;
    }
});
