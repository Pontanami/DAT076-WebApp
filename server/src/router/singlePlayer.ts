import express, { Request, Response } from "express";
import { Course } from "../model/course";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";
import { singlePlayerService } from "../service/singlePlayer";
import { GameService } from "../service/game";

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

interface CreateSPGameRequest extends Request{
    body : {playerId : number}
}

singlePlayerRouter.post("/", async(
    req : CreateSPGameRequest, 
    res : Response<number | string>
) => {
    try {
        const playerId = req.body.playerId;
        if (typeof(playerId) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- playerId has type ${typeof(playerId)}`);
            return;
        }
        const newGameID : number = await SinglePlayerService.createSinglePlayerGame(playerId);
        res.status(201).json(newGameID)
    } catch (e: any) {
        console.log(e)
        res.status(500).send(e.message);
    }
})
/*
singlePlayerRouter.post("/", async (
    req: Request<{}, {}, { playerId : number }>,
    res: Response<number | string>
) => {
    try {
        const playerId = req.body.playerId;
        if (typeof(playerId) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- playerId has type ${typeof(playerId)}`);
            return;
        }
        const newGameID : number = await SinglePlayerService.createSinglePlayerGame(playerId);
        res.status(201).json(newGameID)
    } catch (e: any) {
        console.log(e)
        res.status(500).send(e.message);
    }
})*/
/*
interface UpdateSPGameRequest extends Request{
    body : {gameId : number}
}

singlePlayerRouter.post("/update", async(
    req: UpdateSPGameRequest,
    res: Response<[Course, Course] | string>
    ) => {
        try {
            const gameId = req.body.gameId;
            if (typeof(gameId) !== "number") {
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- gameId has type ${typeof(gameId)}`);
                return;
            }

            let gameService = await SinglePlayerService.getGameService()
            gameService.startNextRound(gameId)
            let sP = await SinglePlayerService.getSinglePlayerGame(gameId)
            res.status(200).send([sP.game.questions[0], sP.game.questions[1]]);
        
        } catch (e: any) {
            console.log(e)
            res.status(500).send(e.message);
        }
    });
    */
/*
singlePlayerRouter.post("/update", async(
    req: Request<{}, {}, {playerId: number, gameId: number}>,
    res: Response<[Course, Course] | string>
    ) => {
        try {
            const playerId = req.body.playerId;
            const gameId = req.body.gameId;
            if (typeof(playerId) !== "number" || typeof(gameId) !== "number") {
                res.status(400).send(`Bad PUT call to ${req.originalUrl} --- playerId has type ${typeof(playerId)} and gameId has type ${typeof(gameId)}`);
                return;
            }

            let gameService = await SinglePlayerService.getGameService()
            gameService.gameUpdate(playerId, gameId)
            let sP = await SinglePlayerService.getSinglePlayerGame(gameId)
            res.status(200).send([sP.game.questions[0], sP.game.questions[1]]);
        
        } catch (e: any) {
            console.log(e)
            res.status(500).send(e.message);
        }
    });
*/
/*
interface FetchSPQuestionsRequest extends Request{
    params : {id : string}
}

singlePlayerRouter.get("/:id", async (
    req: FetchSPQuestionsRequest,
    res: Response<[Course, Course] | string>
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
        console.log(gameId)

        let gameService = await SinglePlayerService.getGameService()
        let questions = await gameService.getCurrentQuestions(gameId)
        res.status(200).send(questions);
    
    } catch (e: any) {
        console.log(e)
        res.status(500).send(e.message);
    }
});*/
/*
singlePlayerRouter.get("/:id", async (
    req: Request<{id : string}, {}, {}>,
    res: Response<[Course, Course] | string>
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
        console.log(gameId)

        let gameService = await SinglePlayerService.getGameService()
        let questions = await gameService.getCurrentQuestions(gameId)
        res.status(200).send(questions);
    
    } catch (e: any) {
        console.log(e)
        res.status(500).send(e.message);
    }
});
*/