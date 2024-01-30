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
    req: Request<{}, {}, { course: Course }>,
    res: Response<Course|string>
) => {
    try {
        const course = req.body.course;
        const name = course.name;
        const code = course.code;
        const failrate = course.failrate;
        if (JSON.stringify(typeof (course)) !== "Course") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- Course has type ${typeof(course)}`);
            return;
        }
        const newCourse = await courseService.createCourse(name, code, failrate);
        res.status(201).send(newCourse);
}catch (e: any) {
    res.status(500).send(e.message);
}
});