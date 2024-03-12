import express, { Request, Response } from "express";
import { Player } from "../model/player";
import { IMultiplayerService } from "../service/IMultiplayerService";
import { multiPlayerService } from "../service/multiPlayer";

const mpService : IMultiplayerService = new multiPlayerService();
export const mpRouter = express.Router();

interface CreateGameRequest extends Request{
    body : { hostId: number  }
}

mpRouter.post("/", async (
    req: CreateGameRequest,
    res: Response<number | string>
) => {
    try {
        const hostId = req.body.hostId;
        if (typeof (hostId) !== "number") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- id type doesn't match, Name has type ${typeof (hostId)}`);
            return;
        }
        const mpGame = await mpService.createMultiPlayerGame(hostId);
        res.status(201).json(mpGame.game.id);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

interface AddPlayerRequest extends Request{
    body : { gameId: number, playerId: number  }
}

mpRouter.post("/addPlayer", async (
    req: AddPlayerRequest,
    res: Response<boolean | string>
) => {
    try {
        const gameId = req.body.gameId;
        const playerId = req.body.playerId;
        if (typeof (gameId) !== "number" || typeof (playerId) !== "number") {
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- type doesn't match, gameId has type ${typeof (gameId)} and playerId has type ${typeof (playerId)}`);
            return;
        } 

        const mpGame = await mpService.joinMultiPlayerGame(gameId, playerId);
        res.status(201).send(mpGame);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

//TODO: Kolla på hur man gör ett sånt här interface
interface FetchMpGamePlayersRequest extends Request {
    params: { id: string }
}

mpRouter.get("/:id", async (
    req: FetchMpGamePlayersRequest,
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
        players.sort((a, b) => b.score - a.score);
        res.status(200).send(players);

    } catch (e: any) {
        res.status(500).send(e.message);
    }
});