import * as SuperTest from "supertest";
import { Course } from "../model/course";
import { CourseService } from "../service/course";
import { app } from "../start";

jest.mock("../db/conn.ts");
const request = SuperTest.default(app);

//fails because post to /course does not exist
test("Check answer test", async () => {
    const cs = CourseService.getInstance()

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
    
    
    expect(response1.status).toBe(201)
    expect(response1.body.name).toEqual("UserTest1234");

    const response2 = await request.post("/course/answer").send({
        codeClicked: "DFG456",
        otherCode: "ABC123",
        playerId: userId
    });

    expect(response2.status).toBe(200)
    expect(response2.body).toBeTruthy()
});

test("A post to /answer with a non-string codeClicked should return 400", async () => {
    const response = await request.post("/course/answer").send({
        codeClicked: 1,
        otherCode: "DFG456",
        playerId: 1
    });
    expect(response.status).toBe(400);
});