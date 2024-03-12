import * as SuperTest from "supertest";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";
import { app } from "../start";

const request = SuperTest.default(app);
jest.mock("../db/conn.ts");

test("End-to-end test", async () => {
    let playerService = PlayerService.getInstance();
    let player = await playerService.createPlayer(66,"test66")
    const response1 = await request.post("/leaderboard").send({
        id: player.id,
    });
    expect(response1.status).toBe(201);
    expect(response1.body.map((player : Player) => player.name)).toContain(player.name);
    player.score=11;
    const response2 = await request.post("/leaderboard").send({
        id: player.id,
    });

    expect(response2.status).toBe(201);
    const response3 = await request.get("/leaderboard/players");
    expect(response3.status).toBe(200);
    expect(response3.body.map((player: Player) => player.id)).toContain (player.id)
    expect(response3.status).toBe(200);
    expect(response3.body.map((player: Player) => player.score)).toContain(11)
});

test("A post to /leaderboard with a non-number id should return 400", async () => {
    const response = await request.post("/leaderboard").send({
        id: "test",
    });
    expect(response.status).toBe(400);
});

test ("A get to /leaderboard/players should return 200", async () => {
    const response = await request.get("/leaderboard/players");
    expect(response.status).toBe(200);
});