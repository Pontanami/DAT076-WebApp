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
    const newCourse = await cs.createCourse(request.name, request.code, request.passrate);
    
        if (!request.code || !request.name || !request.passrate) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- missing code, name, or passrate. name: ${request.name}, code: ${request.code}, passrate: ${request.passrate}`);
            return;
        }
      
        res.status(201).send(newCourse);
}catch (e: any) {
    res.status(500).send(e.message);
}
});