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
    async changeLeaderboard(player: Player) : Promise<Leaderboard>{
        this.nr_entries += 1;
        let addplayer : Player = player;
        //Denna pushar undefined, player finns inte?
        this.player_entries.push(addplayer);
        console.log(this.player_entries);
        console.log("Player pushed");
        return this.getLeaderboard();
    }*/

    //Är det här korrekt för att hämta spelarna utan att påverka resterande del av programmet?
    async changeLeaderboard(id: number) : Promise<Leaderboard>{

        let player = await this.playerService.getPlayer(id);

        if(!player)
            throw new Error("Player does not exist!");
            

        let playerExist = await this.isPlayerInLeaderboard(id);

        if(playerExist == false){
            await this.addPlayerToLeaderboard(player);
        }
        else{
            await this.updatePlayerInLeaderboard(player.id, player.score)
        }
        await this.playerService.resetPlayerScore(player.id);
        
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

    private async addPlayerToLeaderboard(player: Player) {
        this.nr_entries += 1;
        let copyPlayer = JSON.parse(JSON.stringify(player));
        this.player_entries.push(copyPlayer);
    }

    async updatePlayerInLeaderboard(id : number, score: number) : Promise<Leaderboard>{
        let player = this.player_entries.find(player => player.id === id);

        if(!player)
            throw new Error("Player is not yet on the leaderboard");
            
        else if (score > player.score)
            player.score = score;

        return this.getLeaderboard();
    }

    async getPlayerEntries() : Promise<Player[]>{
        return JSON.parse(JSON.stringify(this.player_entries))
    }

    private async isPlayerInLeaderboard(id :  number) : Promise<boolean> {
        let player = this.player_entries.find(player => player.id === id);
        if(!player)
            return false;

        return true;
    }
}