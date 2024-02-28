import express, { Request, Response } from "express";
import { Player } from "../model/player";
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
    res: Response<boolean|string>
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
        res.status(201).send(mpGame);
    } catch (e: any) {
        res.status(500).send(e.message);
        console.log(e.message);
    }
});

//TODO: Kolla på hur man gör ett sånt här interface
interface FetchMpGamePlayers extends Request{
    params : {id : string}
}

mpRouter.get("/:id", async (
    req: Request<{id:string}, {}, {}>,
    res: Response<Player[] | string>
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
        let players = await mpService.getPlayers(gameId)
        res.status(200).send(players);
    
    } catch (e: any) {
        console.log(e)
        res.status(500).send(e.message);
    }
});