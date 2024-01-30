import { Player } from "./player";

export interface Leaderboard{
    nr_entries: number;
    player_entries: Player[]; 
}