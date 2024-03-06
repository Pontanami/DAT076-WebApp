import { Course } from "../model/course";
import { Player } from "../model/player";
import { Game } from "../model/game";
import { CourseService } from "./course";
import { PlayerService } from "./player";
import { GameService } from "./game";
import { singlePlayerService} from "./singlePlayer";
import e from "express";

test("If a session is created it should be in the list of sessions", async () => {
    const sessionService = new GameService();
    let createdSession = await sessionService.createGame();
 //   expect(sessionService.getGame(createdSession.id)).toContain(createdSession); Behöver kollas på
});

test("If a session is created it should be in the list of sessions", async () => {
    const sessionService = new GameService();
    let createdSession = await sessionService.createGame();
    let recivedSession = await sessionService.getGame(createdSession.id);
    expect(recivedSession).toEqual(createdSession);
});

test("Game Test", async () =>{
    const sPService = new singlePlayerService();
    const courseService = CourseService.getInstance();
    const playerService = PlayerService.getInstance();
    const player = await playerService.createPlayer(10,"singlePlaye");
    let course1 = await courseService.createCourse("MVE600", "TestA", 50);
    let course2 = await courseService.createCourse("MVE601", "TestB", 95);
    let course3 = await courseService.createCourse("MVE602", "TestC", 5);
    const game = await sPService.createSinglePlayerGame(player.id);
    if(!game){
        return;
    }
});
