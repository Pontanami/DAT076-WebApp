import express, { Request, Response } from "express";
import { ISinglePlayerService } from "../service/ISinglePlayerService";
import { singlePlayerService } from "../service/singlePlayer";

const SinglePlayerService : ISinglePlayerService= new singlePlayerService()
export const singlePlayerRouter = express.Router();

interface CreateSPGameRequest extends Request {
    body: { playerId: number }
}

singlePlayerRouter.post("/", async (
    req: CreateSPGameRequest,
    res: Response<number | string>
) => {
    try {
        const playerId = req.body.playerId;
        if (typeof (playerId) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- playerId has type ${typeof (playerId)}`);
            return;
        }
        const newGameID: number = await SinglePlayerService.createSinglePlayerGame(playerId);
        res.status(201).json(newGameID)
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});