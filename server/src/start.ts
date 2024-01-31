import express from "express";
import { leaderboardRouter } from "./router/leaderboard";
import { playerRouter } from "./router/player";

export const app = express();

app.use(express.json());
app.use("/leaderboard", leaderboardRouter);
app.use("/player", playerRouter);

