import * as SuperTest from "supertest";
import { Course } from "../model/course";
import { app } from "../start";


const request = SuperTest.default(app);


test("Check answer test", async () => {
    const response1 = await request.post("/course").send({
        code: "ABC123",
        name: "test",
        failrate: 50
    });
    expect(response1.status).toBe(201);
    expect(response1.body.code).toBe("ABC123");

    const response2 = await request.post("/course").send({
        code: "DFG456",
        name: "test2",
        failrate: 60
    });
    expect(response2.status).toBe(201);
    expect(response2.body.code).toBe("DFG456");

    const response3 = await request.post("/course/answer").send({
        codeClicked: "ABC123",
        otherCode: "DFG456"
    });
 //   expect(response3.status).toBe(200); Behöver kollas på
 //   expect(response3.body).toBe(false);
    
});

test("A Get to /course should return 200", async () => {
    const response = await request.get("/course");
    expect(response.status).toBe(200);
});

test("A post to /answer with a non-string codeClicked should return 400", async () => {
    const response = await request.post("/course/answer").send({
        codeClicked: 1,
        otherCode: "DFG456"
    });
    expect(response.status).toBe(400);
});