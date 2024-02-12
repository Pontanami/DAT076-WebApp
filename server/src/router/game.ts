import express, { Request, Response } from "express";
import { Player } from "../model/player";
import { Game } from "../model/game";
import { GameService } from "../service/game";

const sessionService = new GameService();
export const sessionRouter = express.Router();


sessionRouter.post("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Game | string>
) => {
    try {
        const session = await sessionService.createGame();
        res.status(201).send(session);
    } catch (e: any) {
        console.log(e.message);
        res.status(500).send(e.message);
    }
});
