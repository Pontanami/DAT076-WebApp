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

mpRouter.post("/addPlayer", async (
    req: Request<{}, {}, {gameId : number, playerId : number}>,
    res: Response<string>
) => {
    try {
        const gameId = req.body.gameId;
        const playerId = req.body.playerId;
        if(typeof(gameId) !== "number"){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- id type doesn't match, Name has type ${typeof(gameId)}`);
            return;
        }else if(typeof(playerId) !== "number"){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- id type doesn't match, Name has type ${typeof(playerId)}`);
            return;
        }

        const mpGame = await mpService.joinMultiPlayerGame(gameId, playerId);
        res.status(201).send(mpGame.pin);
    } catch (e: any) {
        res.status(500).send(e.message);
        console.log(e.message);
    }
});