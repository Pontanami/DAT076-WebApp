import * as SuperTest from "supertest";
import { userService } from "../service/user";
import { app } from "../start";

jest.mock("../db/conn")
const request = SuperTest.default(app);

test("If createing a user is successful, it should return a userId, username, and a 200 response", async () => {
    const response = await request.post("/user/signup").send({
        username: "testUser",
        password : "abc123"
    });
    expect(response.status).toBe(200);
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