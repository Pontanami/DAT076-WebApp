import * as SuperTest from "supertest";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";
import { app } from "../start";


const request = SuperTest.default(app);

test("End-to-end test", async () => {
    let playerService = PlayerService.getInstance();
    let player = await playerService.createPlayer("test6")
    const response1 = await request.post("/leaderboard").send({
        id: player.id,
    });
    expect(response1.status).toBe(201);
    expect(response1.body.player_entries.map((player : Player) => player.name)).toContain(player.name);
    const response2 = await request.put(`/leaderboard/${player.id}`).send({
        score: 11
    });

    expect(response2.status).toBe(200);
    const response3 = await request.get("/leaderboard/players");
    expect(response3.status).toBe(200);
    expect(response3.body.map((player: Player) => player.id)).toContain (player.id)
    expect(response3.status).toBe(200);
    expect(response3.body.map((player: Player) => player.score)).toContain(11)
    //should have updated score


    /*
    const response2 = await request.get("/leaderboard/players");
    expect(response2.status).toBe(200);
    expect(response2.body.map((player: Player) => player.id)).toContain (player.id);
    */
});