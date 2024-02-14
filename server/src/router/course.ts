import express, { Request, Response } from "express";
import { Course } from "../model/course";
import { CourseService } from "../service/course";

const courseService = new CourseService();
export const courseRouter = express.Router();

courseRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Course> | String>
) => {
    try {
        const tasks = await courseService.getListOfCourses();
        res.status(200).send(tasks);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

courseRouter.post("/", async (
    req: Request<{}, {}, { code: string, name: string, passrate: number}>,
    res: Response<Course|string>
) => {
    try {
    const cs = CourseService.getInstance();
    const request = req.body;
    
        if (!request.code || !request.name || !request.passrate) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- missing code, name, or passrate. name: ${request.name}, code: ${request.code}, passrate: ${request.passrate}`);
            return;
        }
        const newCourse = await cs.createCourse(request.code, request.name, request.passrate);
      
        res.status(201).send(newCourse);
}catch (e: any) {
    res.status(500).send(e.message);
}
});

courseRouter.post("/answer", async (
    req: Request<{}, {}, { codeClicked: string, otherCode: string}>,
    res: Response<boolean|string>
) => {
    try {
    const cs = CourseService.getInstance();
    const request = req.body;
    console.log(request.codeClicked, request.otherCode)
        if (!request.codeClicked || !request.otherCode) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- missing codeClicked or otherCode. codeClicked: ${request.codeClicked}, otherCode: ${request.otherCode}`);
            return;
        }
        const answer = await cs.checkAnswer(request.codeClicked, request.otherCode);
        res.status(200).send(answer);
}catch (e: any) {
    res.status(500).send(e.message);
}
});