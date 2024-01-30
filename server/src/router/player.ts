import express, { Request, Response } from "express";
import { Player } from "../model/player";
import { PlayerService } from "../service/player";

const playerService = new PlayerService();
export const playerRouter = express.Router();