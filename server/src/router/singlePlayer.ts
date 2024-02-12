import express, { Request, Response } from "express";
import { Course } from "../model/course";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";
import { singlePlayerService } from "../service/singlePlayer";

const SinglePlayerService = new singlePlayerService()
export const singlePlayerRouter = express.Router();

singlePlayerRouter.post("/", async (
    req: Request<{}, {}, {playerId : number}>,
    res: Response<[Course, Course]  | string>
) => {
    try {
        const id = req.body.playerId;
        if(typeof(id) !== "number"){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- Name type doesn't match, Name has type ${typeof(id)}`);
            return;
        }
        const courses  = await SinglePlayerService.createSinglePlayerGame(id)
        res.status(201).send(courses);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

singlePlayerRouter.get("/:id", async (
    req: Request<{gameId : string}, {}, {}>,
    res: Response<[Course, Course] | string>
) => {
    try {
        if (req.params.gameId == null) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- missing id param`);
            return;
        }
        const gameId = parseInt(req.params.gameId, 10);
        if (gameId < 0) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- id must be a non-negative integer`);
            return;
        }
        let questions = await SinglePlayerService.getCurrentQuestions(gameId)
        res.status(200).send(questions);
    
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
