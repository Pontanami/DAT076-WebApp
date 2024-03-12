import * as SuperTest from "supertest";
import { PlayerService } from "../service/player";
import { app } from "../start";

jest.mock("../db/conn")
const request = SuperTest.default(app);

test("If a singlePlayerGame is created, it should return an id and a 201 response", async () => {

  const response = await request.post("/user/signup").send({
    username: "testUser",
    password: "abc123"
  });

  expect(response.status).toBe(201)
  expect(response.body).toContain("testUser");

  const userId = response.body[0]
  const userName = response.body[1]

  const response1 = await request.post("/player").send({
    id: userId,
    name: userName
  });

  expect(response1.status).toBe(201)
  expect(response1.body.name).toEqual("testUser");

  const response2 = await request.post("/singlePlayer/").send({
    playerId: userId
  });

  expect(response2.status).toBe(201);
  expect(response2.body).not.toBeUndefined();
});


test("If a userId is not a number the router should respond with a 400 response", async () => {
  const response3 = await request.post("/singlePlayer/").send({
    playerId: "kehrkjsh"
  });
  expect(response3.status).toBe(400);
})