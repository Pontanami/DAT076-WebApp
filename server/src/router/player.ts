import express, { Request, Response } from "express";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";

const playerService = PlayerService.getInstance();
export const playerRouter = express.Router();

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

        const player = await playerService.getPlayer(index);
        if(!player)
            res.status(404).send(`Player with id ${index} not found`);
        else{
        res.status(200).send(player);
        }
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

playerRouter.get("/name/:name", async (
    req: Request<{name : string}, {}, {}>,
    res: Response<Player | string>
) => {
    try {
        let name = req.params.name;
        if (name == null) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- missing id param`);
            return;
        }

        const player = await playerService.getPlayerByName(name);
        if(!player)
            res.status(404).send(`Player with name ${name} not found`);
        else{
        res.status(200).send(player);
        }
    } catch (e: any) {
        //console.log("Det är knas")
        res.status(500).send(e.message);
    }
});