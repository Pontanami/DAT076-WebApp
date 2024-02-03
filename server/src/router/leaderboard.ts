import express, { Request, Response } from "express";
import { Leaderboard } from "../model/leaderboard";
import { LeaderboardService } from "../service/leaderboard";
import { Player } from "../model/player";

/*
interface addPlayerRequest extends Request{
    id: {},
    body : {}
}
*/
const leaderboardService = new LeaderboardService(); 

export const leaderboardRouter = express.Router();

leaderboardRouter.get("/", async (
    req: Request<{}, {}, {}>,
    res: Response<Leaderboard | String>
) => {
    try { 
        const leaderboard = await leaderboardService.getLeaderboard();
        res.status(200).send(leaderboard);
    } catch (e: any) {
        //console.log("Det är knas")
        res.status(500).send(e.message);
    }
});


leaderboardRouter.get("/players", async (
    req: Request<{}, {}, {}>,
    res: Response<Array<Player> | String>
) => {
    try {
        const players = await leaderboardService.getPlayerEntries();
        res.status(200).send(players);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

/*
leaderboardRouter.post("/", async (
    req: Request<{}, {}, {player1 : Player}>,
    res: Response<Leaderboard | string>
) => {
    try {
        const player = req.body.player1;
        console.log(`Router: ${typeof(player)}`)
        if(typeof(player.id) !== "number" && typeof(player.score) !== "number"  && typeof(player.name) !== "string"){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- Player type doesn't match, Player has type ${typeof(player)}`);
            return;
        }
        const addLeaderboardEntry = await leaderboardService.addLeaderboardEntry(player);
        res.status(201).send(addLeaderboardEntry);
    } catch (e: any) {
        console.log(e.message);
        res.status(500).send(e.message);
    }
});
*/

leaderboardRouter.post("/", async (
    req: Request<{}, {}, {id: number}>,
    res: Response<Leaderboard | string>
) => {
    try {
        const id = req.body.id;
        if(typeof(id) !== "number"){
            res.status(400).send(`Bad POST call to ${req.originalUrl} --- Id is of wrong type, it has type ${typeof(id)}`);
            return;
        }
        const addLeaderboardEntry = await leaderboardService.addLeaderboardEntry(id);
        res.status(201).send(addLeaderboardEntry);
    } catch (e: any) {
        console.log(e.message);
        res.status(500).send(e.message);
    }
});





leaderboardRouter.put("/:playerid", async (
    req: Request<{playerid: string}, {}, {score : number}>,
    res: Response<Leaderboard | string>
) => {
    try {
        if (req.params.playerid == null) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- missing id param`);
            return;
        }
        if (typeof (req.body.score) !== "number") {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- field 'score' has type ${typeof(req.body.score)}`);
            return;
        }
        if (req.body.score <= 0) {
            res.status(405).send(`Bad PUT call to ${req.originalUrl} --- Score can't be negative`);
            return;
        }
        const index = parseInt(req.params.playerid, 10);
        if (index < 0) {
            res.status(400).send(`Bad PUT call to ${req.originalUrl} --- id number must be a non-negative integer`);
            return;
        }

        const update = await leaderboardService.updatePlayerInLeaderboard(index, req.body.score);

        if (!update) {
            res.status(404).send(`No leaderboard entry with index ${index}`)
            return;
        }
        res.status(200).send("Leaderboard updated");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
