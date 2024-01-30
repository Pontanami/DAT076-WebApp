import express from "express";
import { leaderboardRouter } from "./router/leaderboard";

export const app = express();

app.use(express.json());
app.use("/leaderboard", leaderboardRouter)

