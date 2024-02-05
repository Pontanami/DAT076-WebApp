import { Leaderboard } from "../model/leaderboard";
import { Player } from "../model/player";
import { PlayerService } from "./player";

export class LeaderboardService{

    nr_entries : number = 0;
    player_entries : Player[] = [];
    playerService = PlayerService.getInstance();

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

    //Är det här korrekt för att hämta spelarna utan att påverka resterande del av programmet?
    async addLeaderboardEntry(id: number) : Promise<Leaderboard | undefined>{
        let player = await this.playerService.getPlayer(id);

        if(!player)
            return undefined;

        this.nr_entries += 1;
        this.player_entries.push(player);
        
        return this.getLeaderboard();

        /*this.playerService.getPlayer(id).then((player) => {

        if(!player)
            return undefined;

        this.nr_entries += 1;
        this.player_entries.push(player);
        return this.getLeaderboard();

        });
        return this.getLeaderboard();*/
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