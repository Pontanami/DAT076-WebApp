import * as SuperTest from "supertest";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";
import { app } from "../start";

jest.mock("../db/conn")


    

test("If a player is created, it should return an player and a 201 response", async () => {

    const request = SuperTest.default(app);

    const response = await request.post("/user/signup").send({
    username: `testUser`,
    password : "abc123"
    });

    expect(response.status).toBe(201)
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
});

test("If we get a player by id, it should return the player and a 200 response", async () => {
    const request = SuperTest.default(app);

    const response = await request.post("/user/signup").send({
    username: `testUser1`,
    password : "abc123"
    });

    expect(response.status).toBe(201)
    expect(response.body).toContain("testUser1");

    const userId = response.body[0]
    const userName = response.body[1]

    const response1 = await request.post("/player").send({
        id: userId,
        name : userName
        });

    expect(response1.status).toBe(201)

    const response2 = await request.get(`/player/${userId}`).send()

    expect(response2.status).toBe(200)
    expect(response2.body).toEqual(response1.body);
})