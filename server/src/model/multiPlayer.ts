import { Game } from "./game";
import { Player } from "./player";

export interface multiPlayer{
    host : Player,
    players : Player[],
    game : Game
}