import { multiPlayer } from "../model/multiPlayer"
import { Player } from "../model/player";
import { PlayerService } from "./player";
import { GameService } from "./game";

export class multiPlayerService{

    gameService = new GameService();
    playerService = PlayerService.getInstance();
    mpGames : multiPlayer[] = []; 
    gamePins: string[] = [];
    
    async createMultiPlayerGame(hostId: number) : Promise<multiPlayer>{
       
        let host = hostId
        let game = await this.gameService.createGame()
        let pin: string = await this.createGamePin();
        if(host && game){
            let newMultiSession = {
                host : host, 
                players : [],
                game : game,
                pin : pin
            }

            this.mpGames.push(newMultiSession);
        
            return JSON.parse(JSON.stringify(newMultiSession))
        }
        throw new Error("Somehting went wrong when creating the session");
    }

    async joinMultiPlayerGame(gameId : number, playerId : number) : Promise<multiPlayer>{
       
        let player = playerId
        let game = gameId

        this.addPlayerToGame(game, player);
       
        throw new Error("Somehting went wrong when joining the session");
    }

    async addPlayerToGame(gameId : number, playerId: number): Promise<boolean>{
        let player = await this.playerService.getPlayer(playerId)
        let game = this.mpGames.find(mpGame => mpGame.game.id === gameId);
        if (!player) {
            throw new Error("Player Not found!");
        } else if (!game) {
            throw new Error("Game not found!");
        }
        game.players.push(player);
        
        //bool if adding succeeded
        return true;
    }

    async getSessionPlayers(gameId : number): Promise<Player[] | undefined> {
        let game = this.mpGames.find(mpGame => mpGame.game.id === gameId);
        if (!game) {
            throw new Error("Game not found!");
        }
        return JSON.parse(JSON.stringify(game.players));
    }

    async createGamePin(): Promise<string> {
        let newPin : string = await this.generatePin();
        if (this.gamePins.includes(newPin)){
            return this.createGamePin();
        } else {
            this.gamePins.push(newPin);
        }
        return newPin;
    }

    async generatePin(): Promise<string> {
        const min = 100000; // Minimum six-digit number (inclusive)
        const max = 999999; // Maximum six-digit number (inclusive)
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        return randomNumber.toString();
    }
}



