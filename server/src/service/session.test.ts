import { Player } from "../model/player";
import { Session } from "../model/session";
import { PlayerService } from "./player";
import { SessionService } from "./session";

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
    const sessionService = new SessionService();
    const playerService = new PlayerService();
    let createdPlayer = await playerService.createPlayer("test3");
    let createdSession = await sessionService.createSession();
    sessionService.addPlayerToSession(createdSession.id, createdPlayer.id);
    let recivedSession = await sessionService.getSession(createdSession.id);
    console.log(recivedSession)
    expect(recivedSession?.players.map((player : Player) => createdPlayer)).toContain(createdPlayer)
})
*/