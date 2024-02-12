import { Session } from "./game";
import { Player } from "./player";

export interface multiPlayer{
    host : Player,
    players : Player[],
    session : Session
}