import { Game } from "./game";
import { Player } from "./player";

export interface multiPlayer{
    host : number,
    players : Player[],
    game : Game,
}