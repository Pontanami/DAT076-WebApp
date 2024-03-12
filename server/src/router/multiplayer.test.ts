import * as SuperTest from "supertest";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";
import { app } from "../start";

jest.mock("../db/conn")

let request : any
let userId : number
let validatePlayer : Player

beforeAll(async()=> {
    request = SuperTest.default(app);

    const response = await request.post("/user/signup").send({
    username: "testUser",
    password : "abc123"
    });

    expect(response.status).toBe(201)
    expect(response.body).toContain("testUser");

    userId = response.body[0]
    const userName = response.body[1]

    const response1 = await request.post("/player").send({
    id: userId,
    name : userName
    });

    validatePlayer = {
    id: userId,
    name : userName, 
    score : 0
    }

    expect(response1.status).toBe(201)
    expect(response1.body).toEqual(validatePlayer);
})


test("If a multiPlayerGame is created, it should return an id and a 201 response", async () => {
    const response2 = await request.post("/multiPlayer").send({
        hostId: userId,
        });
    
    expect(response2.status).toBe(201);
    expect(response2.body).not.toBeUndefined();
});

//TODO
test("If a player is added to a multiPlayerGame, it should return True and a 201 response", async () => {
    const response2 = await request.post("/multiPlayer").send({
        hostId: userId,
        });
    
    expect(response2.status).toBe(201);
    expect(response2.body).not.toBeUndefined();

    const response3 = await request.post("/multiPlayer/addPlayer").send({
        gameId: response2.body,
        playerId: userId
    })

    expect(response3.status).toBe(201)
    expect(response3.body).toBeTruthy()
});

test("If a multiplayerGame is fetched, it should return the players in the game and a 201 response", async () => {
    const response2 = await request.post("/multiPlayer").send({
        hostId: userId,
        });
    
    expect(response2.status).toBe(201);
    expect(response2.body).not.toBeUndefined();

    const response3 = await request.post("/multiPlayer/addPlayer").send({
        gameId: response2.body,
        playerId: userId
    })

    expect(response3.status).toBe(201)
    expect(response3.body).toBeTruthy()

    const response4 = await request.get(`/multiPlayer/${response2.body}`).send()

    expect(response4.status).toBe(200)
    expect(response4.body).toContainEqual(validatePlayer)
});