import express, { Request, Response } from "express";
import { Player } from "../model/player";
import { IPLayerService } from "../service/IPlayerService";
import { PlayerService } from "../service/player";

const playerService : IPLayerService = PlayerService.getInstance();
export const playerRouter = express.Router();

interface FetchPlayerRequest extends Request {
    params: { id: string }
}

//TODO: Kolla på error 404 här, det känns som den aldrig kommer köras typ
playerRouter.get("/:id", async (
    req: FetchPlayerRequest,
    res: Response<Player | string>
) => {
    try {
        if (req.params.id == null) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- missing id param`);
            return;
        }
        const index = parseInt(req.params.id, 10);
        if (index < 0) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- id must be a non-negative integer`);
            return;
        }

        const player = await playerService.getPlayer(index);
        res.status(200).send(player);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

interface CreatePlayerRequest extends Request{
    body : { id: string, name: string }
}

playerRouter.post("/", async (
    req: CreatePlayerRequest,
    res: Response<Player | string>
) => {
    try {
        const id = req.body.id;
        const name = req.body.name
        if (typeof (id) !== "number" || typeof (name) !== "string") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- Name or Id type doesn't match, Name has type ${typeof (name)} and Id has type ${typeof (id)}`);
            return;
        }
        const player = await playerService.createPlayer(id, name);
        res.status(201).send(player);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});