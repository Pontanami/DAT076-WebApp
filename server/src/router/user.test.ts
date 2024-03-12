import * as SuperTest from "supertest";
import { app } from "../start";

jest.mock("../db/conn")
const request = SuperTest.default(app);

test("If createing a user is successful, it should return a userId, username, and a 200 response", async () => {
    const response = await request.post("/user/signup").send({
        username: "testUser",
        password : "abc123"
    });
    expect(response.status).toBe(201);
    expect(response.body).toContain("testUser");
});

test("If a user login is successful, it should return a userId, username, and a 200 response", async () => {
    const response = await request.post("/user/login").send({
        username: "testUser",
        password : "abc123"
    });
    expect(response.status).toBe(200);
    expect(response.body).toContain("testUser");
});

test("If a user tries to login without a password a 400 respons should be sent", async () => {
    const response = await request.post("/user/login").send({
        username:"",
        password:""
    });
    expect(response.status).toBe(400);
});

test("If a user tries to create an account with the wrongtypes a 400 respons should be sent", async () => {
    const response = await request.post("/user/signup").send({
        username:1,
        password:23
    });
    expect(response.status).toBe(400);
});

test("If a user tries to create an account with an already existing username a 409 respons should be sent", async () =>{
    const response = await request.post("/user/signup").send({
        username: "testUser",
        password : "abc123"
    });
    expect(response.status).toBe(409);
})