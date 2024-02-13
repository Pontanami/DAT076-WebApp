import express, { Request, Response } from "express";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";

const playerService = PlayerService.getInstance();
export const playerRouter = express.Router();

playerRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Player> | string>
) => {
    try {
        const players = await playerService.getPlayers();
        res.status(200).send(players);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
}
)

playerRouter.get("/:id", async (
    req: Request<{id : string}, {}, {}>,
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

        const player = await playerService.createPlayer(req.params.id);
        res.status(200).send(player);
    
    } catch (e: any) {
        //console.log("Det är knas")
        res.status(500).send(e.message);
    }
});

playerRouter.post("/", async (
    req: Request<{}, {}, {name : string}>,
    res: Response<Player | string>
) => {
    try {
        const name = req.body.name;
        if(typeof(name) !== "string"){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- Name type doesn't match, Name has type ${typeof(name)}`);
            return;
        }
        const player = await playerService.createPlayer(name);
        res.status(201).send(player);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});