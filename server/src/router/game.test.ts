import * as SuperTest from "supertest";
import { Course } from "../model/course";
import { CourseService } from "../service/course";
import { GameService } from "../service/game";
import { app } from "../start";

const request = SuperTest.default(app);
jest.mock("../db/conn.ts");

let gameId : number
const cs = CourseService.getInstance()

beforeAll(async () =>{

    await cs.createCourse("ABC123", "test", "Sjö", 50);
    await cs.createCourse("DFG456", "test2", "Sjö", 60);

    const response = await request.post("/user/signup").send({
        username: "UserTest1234",
        password : "abc123"
    });
    
    expect(response.status).toBe(201)
    expect(response.body).toContain("UserTest1234");
    
    const userId = response.body[0]
    const userName = response.body[1]
    
    const response1 = await request.post("/player").send({
      id: userId,
      name : userName
    });

    
   
    const response2 = await request.post("/singlePlayer/").send({
        playerId: userId
    });

    expect(response2.status).toBe(201);
    expect(response2.body).not.toBeUndefined();
    gameId = response2.body
})

test("Getting the current questions should return the current question and a 200 response", async () => {
    
    let questions : Course[] = await GameService.getInstance().getGameQuestions(gameId)

    const response3 = await request.get(`/game/${gameId}`).send()

    expect(response3.status).toBe(200);
    expect(response3.body).toStrictEqual([questions[0],questions[1]]);
})

//Failar för att vi inte kan skapa ett game via gameRouter
test("Updating a game should return the next questions and a 201 status code", async () => {

    
    await cs.createCourse("DFG457", "test3", "Sjö", 65);
    let questions : Course[] = await GameService.getInstance().getGameQuestions(gameId)

    let c2 = questions[1]
    let c3 = questions[2]

    const response4 = await request.post('/game/update').send({
        gameId: gameId
    })

    expect(response4.status).toBe(201);
    expect(response4.body).toStrictEqual([c2, c3]);
})

test("If a user sends a non-integer as a parameter to update game, a 400 response should be sent back", async() =>{
    const response4 = await request.post('/game/update').send({
        gameId: "hello"
    })
    expect(response4.status).toBe(400);
})

test("If a user tries to get a game with negative index, a 400 response should be sent back", async() =>{
    const response = await request.get(`/game/-1`).send()
    expect(response.status).toBe(400);
})

test("Trying to get a game that doesn't exist should send back a 500 response", async () => {
    const response = await request.get(`/game/1234`).send()
    expect(response.status).toBe(500);
})