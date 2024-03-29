import express, { Request, Response } from "express";
import { GameService } from "../service/game";
import { Course } from "../model/course";
import { IGameService } from "../service/IGameService";

const gameService : IGameService = GameService.getInstance();
export const gameRouter = express.Router();

interface UpdateGameRequest extends Request {
    body: { gameId: number }
}

gameRouter.post("/update", async (
    req: UpdateGameRequest,
    res: Response<[Course, Course] | string>
) => {
    try {
        const gameId = req.body.gameId;
        if (typeof (gameId) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- gameId has type ${typeof (gameId)}`);
            return;
        }
        let questions = await gameService.startNextRound(gameId)
        res.status(201).send([questions[0], questions[1]]);

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

interface FetchQuestionsRequest extends Request {
    params: { id: string }
}

gameRouter.get("/:id", async (
    req: FetchQuestionsRequest,
    res: Response<[Course, Course] | string>
) => {
    try {
        if (req.params.id == null) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- missing id param`);
            return;
        }
        const gameId = parseInt(req.params.id, 10);
        if (gameId < 0) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- id must be a non-negative integer`);
            return;
        }
        console.log("GameID is: " + gameId)

        let questions = await gameService.getCurrentQuestions(gameId)
        res.status(200).send(questions);

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});