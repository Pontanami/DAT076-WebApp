import express, { Request, Response } from "express";
import { Course } from "../model/course";
import { CourseService } from "../service/course";
import { ICourseService } from "../service/ICourseService";
import { PlayerService } from "../service/player";

const playerService = PlayerService.getInstance();
export const courseRouter = express.Router();

interface AnswerRequest extends Request{
    body : {codeClicked: string, otherCode: string, playerId: number}
}

courseRouter.post("/answer", async (
    req: AnswerRequest,
    res: Response<boolean | string>
) => {
    try {
        const courseService : ICourseService = CourseService.getInstance();
        const request = req.body;
        if (!request.codeClicked || !request.otherCode || !request.otherCode) {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- missing codeClicked, otherCode or playerId. codeClicked: ${request.codeClicked}, otherCode: ${request.otherCode}, playerId: ${request.playerId} `);
            return;
        }
        if (typeof (request.codeClicked) !== "string" || typeof (request.otherCode) !== "string" || typeof (request.playerId) !== "number") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- codeClicked or otherCode is of wrong type. codeClicked: ${typeof request.codeClicked}, otherCode: ${typeof request.otherCode}`);
            return;
        }
        const answer = await courseService.checkAnswer(request.codeClicked, request.otherCode);
        if (answer) {
            playerService.updatePlayerScore(request.playerId)
        }
        res.status(200).send(answer);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});