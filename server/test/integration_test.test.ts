import * as SuperTest from "supertest";
import { app } from "../src/start";
import { Player } from "../src/model/player";
const request = SuperTest.default(app);

test("End-to-end test", async () => {
    let player = new Player("test");
    /*
    console.log(`Test: ${typeof (player)}`);
    console.log(`Stringify: ${typeof()}`)
    */
    const response1 = await request.post("/leaderboard").send({
        id: player.id,
        name: player.name,
        score: player.score
    });
    expect(response1.status).toBe(201);



    console.log(response1.body);
    expect(response1.body.player_entries[0].name).toBe (player.name);
    //const players = await request.get("/leaderboard/players")
    const response2 = await request.get("/leaderboard/players");
    console.log(response2.body);
    console.log(typeof(response2.body));
    expect(response2.status).toBe(200);
    expect(response2.body.map((player: Player) => player.id)).toContain (player.id);
});