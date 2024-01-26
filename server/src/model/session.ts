import {Player} from "../model/player";

export interface Session {
    id: number;
    players: Player[];
}