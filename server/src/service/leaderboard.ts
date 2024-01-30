import { Leaderboard } from "../model/leaderboard";
import { Player } from "../model/player";

export class LeaderboardService{

    nr_entries : number = 0;
    player_entries : Player[] = [];

    async getLeaderboard() : Promise<Leaderboard>{
        let leaderboard : Leaderboard = {
            nr_entries: this.nr_entries,
            player_entries: this.player_entries 
        }
        return {...leaderboard}
    }

    async addLeaderboardEntry(player: Player) : Promise<Leaderboard>{
        this.nr_entries += 1;
        this.player_entries.push({...player})
        return this.getLeaderboard();
    }

    async updatePlayerInLeaderboard(id : number, score: number) : Promise<Leaderboard | undefined>{
        let player = this.player_entries.find(player => player.id = id);

        if(!player)
            return undefined;

        player.score = score;
        return this.getLeaderboard();
    }

}