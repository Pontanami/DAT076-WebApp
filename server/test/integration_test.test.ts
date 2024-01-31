import * as SuperTest from "supertest";
import { app } from "../src/start";
import { Player } from "../src/model/player";
const request = SuperTest.default(app);

test("End-to-end test", async () => {
    let newPlayer = {
        name: "test",
        id: Date.now(),
        score: 0   
    }
    const response1 = await request.post("/leaderboard").send(newPlayer);
    expect(response1.status).toBe(201);
    expect(response1.body.name).toBe(newPlayer.name);
    const response2 = await request.get("/leaderboard");
    expect(response2.status).toBe(200);
    expect(response2.body.map((player: Player) => player.id)).toContain(newPlayer.id);
});