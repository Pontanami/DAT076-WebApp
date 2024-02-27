import express, { Request, Response } from "express";
import { LeaderboardService } from "../service/leaderboard";
import { Player } from "../model/player";

const leaderboardService = new LeaderboardService(); 

export const leaderboardRouter = express.Router();

/*
leaderboardRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Player[] | String>
) => {
    try { 
        const leaderboard = await leaderboardService.getPlayerEntries();
        res.status(200).send(leaderboard);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
*/

leaderboardRouter.get("/players", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Player> | String>
) => {
    try {
        const players = await leaderboardService.getPlayerEntries();
        players.sort((a, b) => b.score - a.score);
        res.status(200).send(players);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

leaderboardRouter.post("/", async (
    req: Request<{}, {}, {id: number}>,
    res: Response<Player[] | string>
) => {
    try {
        const id = req.body.id;
        if(typeof(id) !== "number"){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- Id is of wrong type, it has type ${typeof(id)}`);
            return;
        }
        const addLeaderboardEntry = await leaderboardService.changeLeaderboard(id);
        res.status(201).send(addLeaderboardEntry);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});