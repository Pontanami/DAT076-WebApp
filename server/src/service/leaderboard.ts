import { Player } from "../model/player";
import { PlayerService } from "./player";
import { ILeaderboardService } from "./ILeaderboardService";
import { IPLayerService } from "./IPlayerService";
import { playerModel } from "../db/player.db";

export class LeaderboardService implements ILeaderboardService{
    playerService: IPLayerService = PlayerService.getInstance();

    async changeLeaderboard(id: number) : Promise<Player[]>{

        let player = await this.playerService.getPlayer(id);

        if(!player)
            throw new Error("Player does not exist!");
            
        console.log("Player: " + JSON.stringify(player));
        let playerExist = await this.isPlayerInLeaderboard(id);

        if(playerExist == false){
            await this.addPlayerToLeaderboard(player);
        }
        else{
            await this.updatePlayerInLeaderboard(player.id, player.score)
        }
        await this.playerService.resetPlayerScore(player.id);
        
        return this.getPlayerEntries();
    }

    async getNumberOfEntries() : Promise<number>{
        const pm = await playerModel;
        return pm.countDocuments();
    }

    private async addPlayerToLeaderboard(player: Player) {
        const pm = await playerModel;
        return await pm.create(player);
    }

    async updatePlayerInLeaderboard(id : number, score: number) : Promise<Player[]>{
        const pm = await playerModel;
        let player: Player|null = await pm.findOne({id: id});
        console.log("Score is: " + score)
        console.log("PlayerScore is: " + player?.score)

        if(!player)
            throw new Error("Player is not yet on the leaderboard");
            
        else if (score > player.score){
            console.log("Updating player: " + JSON.stringify(player));
            await pm.updateOne({
                id: id
            }, {
                score: score
            });
        }
            //player.score = score;
            

        return this.getPlayerEntries();
    }

    async getPlayerEntries() : Promise<Player[]>{
        const pm = await playerModel;
        return await pm.find()
    }

    private async isPlayerInLeaderboard(id :  number) : Promise<boolean> {
        console.log("Checking if player is in leaderboard with id: " + id);
        const pm = await playerModel;
        let player: Player|null = await pm.findOne({id: id});
        console.log(player);
        if(!player)
            return false;

        return true;
    }
}