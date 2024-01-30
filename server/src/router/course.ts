import express, { Request, Response } from "express";
import { Course } from "../model/course";
import { CourseService } from "../service/course";

const courseService = new CourseService();
export const courseRouter = express.Router();
