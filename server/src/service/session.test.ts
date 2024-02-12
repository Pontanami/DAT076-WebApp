import { Course } from "../model/course";
import { Player } from "../model/player";
import { Session } from "../model/session";
import { CourseService } from "./course";
import { PlayerService } from "./player";
import { SessionService } from "./session";
import { singlePlayerService} from "./singlePlayer";

test("If a session is created it should be in the list of sessions", async () => {
    const sessionService = new SessionService();
    let createdSession = await sessionService.createSession();
    let allSessions = await sessionService.getAllSessions();
    expect(allSessions.map((session: Session) => session.id)).toContain(createdSession.id);
});

test("If a session is created it should be in the list of sessions", async () => {
    const sessionService = new SessionService();
    let createdSession = await sessionService.createSession();
    let recivedSession = await sessionService.getSession(createdSession.id);
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
    const sessionService = new SessionService();
    const courseService = CourseService.getInstance()
    let session = await sessionService.createSession();
    let course = await courseService.createCourse("MVE655", "Flervarre", 45)
    await sessionService.addQuestion(session.id,course.code)
    let sessionQuestions = await sessionService.getSessionQuestions(session.id);
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
    await sPService.sessionService.addQuestion(game.session.id, course1.code);
    await sPService.sessionService.addQuestion(game.session.id, course2.code);
    await sPService.sessionService.addQuestion(game.session.id, course3.code);

    let players = await playerService.getPlayers();
    console.log("Players: " + JSON.stringify(players));
    console.log("Player in game: " + JSON.stringify(game.player));
    await sPService.sessionService.checkAnswer(course1.code, course2.code, game.player.id);
    console.log(player.score)
    console.log("Sp player ref"+ JSON.stringify(game.player));
    let playertest = await playerService.getPlayer(game.player.id);
    console.log("Player after (game)" + JSON.stringify(playertest));
});
