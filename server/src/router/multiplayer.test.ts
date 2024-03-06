import * as SuperTest from "supertest";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";
import { app } from "../start";

jest.mock("../db/conn")


test("If a multiPlayerGame is created, it should return an id and a 201 response", async () => {
    const request = SuperTest.default(app);

    const response = await request.post("/user/signup").send({
    username: "testUser",
    password : "abc123"
    });

    expect(response.status).toBe(200)
    expect(response.body).toContain("testUser");

    const userId = response.body[0]
    const userName = response.body[1]

    const response1 = await request.post("/player").send({
    id: userId,
    name : userName
    });

    let validatePlayer : Player = {
    id: userId,
    name : userName, 
    score : 0
    }

    expect(response1.status).toBe(201)
    expect(response1.body).toEqual(validatePlayer);

    const response2 = await request.post("/multiPlayer").send({
        hostId: userId,
        });
    
    expect(response2.status).toBe(201);
    expect(response2.body).not.toBeUndefined();
});

//TODO
test("If a player is added to a multiPlayerGame, it should return the game contaning the player and a 201 response", async () => {
    const request = SuperTest.default(app);

    const response = await request.post("/user/signup").send({
    username: "testUser",
    password : "abc123"
    });

    expect(response.status).toBe(200)
    expect(response.body).toContain("testUser");

    const userId = response.body[0]
    const userName = response.body[1]

    const response1 = await request.post("/player").send({
    id: userId,
    name : userName
    });

    let validatePlayer : Player = {
    id: userId,
    name : userName, 
    score : 0
    }

    expect(response1.status).toBe(201)
    expect(response1.body).toEqual(validatePlayer);

    const response2 = await request.post("/multiPlayer").send({
        hostId: userId,
        });
    
    expect(response2.status).toBe(201);
    expect(response2.body).not.toBeUndefined();
});