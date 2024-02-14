import express, { Request, Response } from "express";
import { Course } from "../model/course";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";
import { singlePlayerService } from "../service/singlePlayer";

const SinglePlayerService = new singlePlayerService()
export const singlePlayerRouter = express.Router();
/*
singlePlayerRouter.post("/", async (
    req: Request<{}, {}, {playerId : number}>,
    res: Response<number | string>
) => {
    console.log("request")
    try {
        const id = req.body.playerId;
        if(typeof(id) !== "number"){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- Name type doesn't match, Name has type ${typeof(id)}`);
           
        }
        console.log("before")
        const gameId  = await SinglePlayerService.createSinglePlayerGame(id)
        console.log("After")
        res.status(201).send(gameId);
    } catch (e: any) {
        console.log("Wasss")
        res.status(500).send(e.message);
    }
});*/

singlePlayerRouter.post("/", async (
    req: Request<{}, {}, { playerId : number }>,
    res: Response<number | string>
) => {
    try {
        console.log("hej")
        const playerId = req.body.playerId;
        if (typeof(playerId) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- playerId has type ${typeof(playerId)}`);
            return;
        }
        console.log("Bapp")
        const newGameID : number = await SinglePlayerService.createSinglePlayerGame(playerId);
        console.log(typeof(newGameID))
        console.log("Napp")
        res.status(201).json(newGameID)
        console.log("Japp")
    } catch (e: any) {
        console.log(e)
        res.status(500).send(e.message);
    }
})

singlePlayerRouter.get("/:id", async (
    req: Request<{id : string}, {}, {}>,
    res: Response<[Course, Course] | string>
) => {
    try {
        if (req.params.id == null) {
            res.status(402).send(`Bad PUT call to ${req.originalUrl} --- missing id param`);
            return;
        }
        const gameId = parseInt(req.params.id, 10);
        if (gameId < 0) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- id must be a non-negative integer`);
            return;
        }
        let gameService = await SinglePlayerService.getGameService()
        let questions = await gameService.getCurrentQuestions(gameId)
        res.status(200).send(questions);
    
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
