import * as SuperTest from "supertest";
import { Player } from "../model/player";
import { app } from "../start";

jest.mock("../db/conn")

let request : any
let response : any
let userId : number
let userName : string

beforeAll(async () =>{
    request = SuperTest.default(app);

    response = await request.post("/user/signup").send({
    username: `testUser`,
    password : "abc123"
    });

    expect(response.status).toBe(201)
    expect(response.body).toContain("testUser");

    userId = response.body[0]
    userName = response.body[1]

})
    

test("If a player is created, it should return an player and a 201 response", async () => {
    
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
    const response1 = await request.post("/player").send({
        id: userId,
        name : userName
        });

    expect(response1.status).toBe(201)

    const response2 = await request.get(`/player/${userId}`).send()

    expect(response2.status).toBe(200)
    expect(response2.body).toEqual(response1.body);
})

test("If the types parameters when creating a player is wrong the router should send a 400 response ", async () => {
    const request = SuperTest.default(app);
    const response1 = await request.post("/player").send({
        id: "jkhekasjhf",
        name : 3
        });

    expect(response1.status).toBe(400)
})