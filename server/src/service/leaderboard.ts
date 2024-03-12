import { Player } from "../model/player";
import { PlayerService } from "./player";
import { ILeaderboardService } from "./ILeaderboardService";
import { IPLayerService } from "./IPlayerService";
import { playerModel } from "../db/player.db";

export class LeaderboardService implements ILeaderboardService{
    playerService: IPLayerService = PlayerService.getInstance();

    /** @inheritdoc */
     async getPlayerEntries() : Promise<Player[]>{
        const pm = await playerModel;
        return await pm.find()
    }
    /** @inheritdoc */
    async changeLeaderboard(id: number) : Promise<Player[]>{

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
        
        return this.getPlayerEntries();
    }

    /**
     * Asynchronously adds a player to the leaderboard in the database.
     * @param player - The player to add to the leaderboard.
     * @returns {Promise<Player>} - Returns the player that was added to the leaderboard.
     */
    private async addPlayerToLeaderboard(player: Player): Promise<Player> {
        const pm = await playerModel;
        return await pm.create(player);
    }

    /**
     * Asynchronously updates a player in the leaderboard in the database.
     * @param id - The id of the player to update.
     * @param score - The new score of the player.
     * @returns {Promise<Player[]>} - Returns the updated list of player in the leaderboard from the database.
     */
    private async updatePlayerInLeaderboard(id : number, score: number) : Promise<Player[]>{
        const pm = await playerModel;
        let player: Player|null = await pm.findOne({id: id});

        if(!player)
            throw new Error("Player is not yet on the leaderboard");
            
        if (score > player.score){
            console.log("Updating player: " + JSON.stringify(player));
            await pm.updateOne({
                id: id
            }, {
                score: score
            });
        }
        return this.getPlayerEntries();
    }

    /** 
     * Asynchronously checks if a player is already in the leaderboard on the database.
     * @param id - The id of the player to check.
     * @returns {Promise<boolean>} - Returns true if the player is in the leaderboard, otherwise false.
    */
    private async isPlayerInLeaderboard(id :  number) : Promise<boolean> {
        const pm = await playerModel;
        let player: Player|null = await pm.findOne({id: id});
        if(!player)
            return false;

        return true;
    }
}