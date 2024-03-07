import * as SuperTest from "supertest";
import { Course } from "../model/course";
import { Game } from "../model/game";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";
import { app } from "../start";

const request = SuperTest.default(app);
jest.mock("../db/conn.ts");

test("Creating a game should return a game and a 201 status code",async () => {
    const response = await request.post("/game").send()

    expect(response.status).toBe(201);
    expect(response.body).not.toBeUndefined();
})


test("Getting the current questions should return the current question and a 200 response", async () => {
    const response = await request.post("/course").send({
        code: "ABC123",
        name: "test",
        failrate: 50
    });
    expect(response.status).toBe(201);
    expect(response.body.code).toBe("ABC123");

    const response1 = await request.post("/course").send({
        code: "DFG456",
        name: "test2",
        failrate: 60
    });
    expect(response1.status).toBe(201);
    expect(response1.body.code).toBe("DFG456");
   
    const response2 = await request.post("/game").send()

    expect(response2.status).toBe(201);
    expect(response2.body).not.toBeUndefined();

    let game : Game = response2.body
    let questions : Course[]= game.questions

    let c1 = questions[0]
    let c2 = questions[1]

    const response3 = await request.get(`/game/${game.id}`).send()

    expect(response3.status).toBe(200);
    expect(response3.body).toStrictEqual([c1, c2]);
})

test("Updating a game should return the next questions and a 201 status code", async () => {
    const response = await request.post("/course").send({
        code: "ABC123",
        name: "test",
        failrate: 50
    });
    expect(response.status).toBe(201);
    expect(response.body.code).toBe("ABC123");

    const response1 = await request.post("/course").send({
        code: "DFG456",
        name: "test2",
        failrate: 60
    });
    expect(response1.status).toBe(201);
    expect(response1.body.code).toBe("DFG456");

    const response2 = await request.post("/course").send({
        code: "DFG456",
        name: "test2",
        failrate: 60
    });
    expect(response2.status).toBe(201);
    expect(response2.body.code).toBe("DFG456");
   
    const response3 = await request.post("/game").send()

    expect(response3.status).toBe(201);
    expect(response3.body).not.toBeUndefined();

    let game : Game = response3.body
    let questions : Course[]= game.questions

    let c2 = questions[1]
    let c3 = questions[2]

    const response4 = await request.post('/game/update').send({
        gameId: game.id
    })

    expect(response4.status).toBe(201);
    expect(response4.body).toStrictEqual([c2, c3]);
})