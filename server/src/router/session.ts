import express, { Request, Response } from "express";
import { Session } from "../model/session";
import { SessionService } from "../service/session";

const sessionService = new SessionService();
export const sessionRouter = express.Router();
