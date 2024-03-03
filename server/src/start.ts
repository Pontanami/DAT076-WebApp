import express from "express";
import { leaderboardRouter } from "./router/leaderboard";
import { playerRouter } from "./router/player";
import { courseRouter } from "./router/course";
import cors from "cors";
import { singlePlayerRouter } from "./router/singlePlayer";
import { userRouter } from "./router/user";
import { mpRouter } from "./router/multiplayer";
import { Server } from 'socket.io';
import { gameRouter } from "./router/game";
import http from 'http';
import { fetchCourses } from "./fetchCourses";
import {socketListener } from "./socketEvent";

export const app = express();
app.use(express.json());
app.use(cors());
app.use("/leaderboard", leaderboardRouter);
app.use("/player", playerRouter);
app.use("/course", courseRouter);
app.use("/singlePlayer", singlePlayerRouter);
app.use("/user", userRouter)
app.use("/multiPlayer", mpRouter)
app.use("/game", gameRouter)

const port = "localhost"

export const server = http.createServer(app);
export const io = new Server(server, {
    cors : {
        origin: `http://${port}:3000`
    }
});

socketListener();
fetchCourses();
