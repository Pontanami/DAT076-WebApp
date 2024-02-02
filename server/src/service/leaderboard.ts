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
    /*
    async addLeaderboardEntry(player: Player) : Promise<Leaderboard>{
        this.nr_entries += 1;
        let addplayer : Player = player;
        //Denna pushar undefined, player finns inte?
        this.player_entries.push(addplayer);
        console.log(this.player_entries);
        console.log("Player pushed");
        return this.getLeaderboard();
    }*/

    async addLeaderboardEntry(id: number, name: string, score: number) : Promise<Leaderboard>{
        this.nr_entries += 1;
        let addplayer = {
            id : id,
            name : name,
            score: score
        };
        this.player_entries.push(addplayer);
        return this.getLeaderboard();
    }

    async updatePlayerInLeaderboard(id : number, score: number) : Promise<Leaderboard | undefined>{
        let player = this.player_entries.find(player => player.id = id);

        if(!player)
            return undefined;
        
        else if (score > player.score)
            player.score = score;

        return this.getLeaderboard();
    }

    async getPlayerEntries() : Promise<Player[]>{
        return JSON.parse(JSON.stringify(this.player_entries))
    }
}