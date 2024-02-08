import { Player } from "./player";
import { Session } from "./session";

export interface singePlayer{
    player : Player,
    parentSession : Session
}