import { Session } from "../model/session";
import { Player } from "./player";

export interface multiPlayer{
    host : Player,
    players : Player[],
    session : Session
}