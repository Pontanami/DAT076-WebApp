import * as SuperTest from "supertest";
import { Player } from "../model/player";
import { app } from "../start";


const request = SuperTest.default(app);

test("End-to-end test", async () => {
    let player = new Player("test");
    const response1 = await request.post("/leaderboard").send({
        id: player.id,
        name: player.name,
        score: player.score
    });
    expect(response1.status).toBe(201);
    expect(response1.body.player_entries[0].name).toBe (player.name);
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