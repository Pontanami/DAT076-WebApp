import express, { Request, Response } from "express";
import { multiPlayerService } from "../service/multiPlayer";

const mpService = new multiPlayerService();
export const mpRouter = express.Router();

mpRouter.post("/", async (
    req: Request<{}, {}, {hostId : number}>,
    res: Response<string>
) => {
    try {
        const hostId = req.body.hostId;
        if(typeof(hostId) !== "number"){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- id type doesn't match, Name has type ${typeof(name)}`);
            return;
        }
        const mpGame = await mpService.createMultiPlayerGame(hostId);
        res.status(201).send(mpGame.pin);
    } catch (e: any) {
        res.status(500).send(e.message);
        console.log(e.message);
    }
});