import exp from "constants";
import * as SuperTest from "supertest";
import { Game } from "../model/game";
import { PlayerService } from "../service/player";
import { singlePlayerService } from "../service/singlePlayer";
import { app } from "../start";


const request = SuperTest.default(app);


test("Check post session test", async () => {

    let playerService = PlayerService.getInstance()
    let player = await playerService.createPlayer("test")
    let SinglePlayerService = new singlePlayerService()

    const response1 = await request.post("/singlePlayer").send({
        playerId : player.id
    });
    expect(response1.status).toBe(201);
    console.log(response1.body)
    const response2 = await request.get("/singlePlayer/"+response1.body)
    expect(response2.status).toBe(200)
});