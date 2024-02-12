import express, { Request, Response } from "express";
import { Player } from "../model/player";
import { Session } from "../model/game";
import { SessionService } from "../service/game";

const sessionService = new SessionService();
export const sessionRouter = express.Router();


sessionRouter.post("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Session | string>
) => {
    try {
        const session = await sessionService.createSession();
        res.status(201).send(session);
    } catch (e: any) {
        console.log(e.message);
        res.status(500).send(e.message);
    }
});
