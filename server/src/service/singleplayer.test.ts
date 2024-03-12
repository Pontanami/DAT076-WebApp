import { singlePlayerService } from "./singlePlayer";
import { PlayerService } from "./player";
import { ISinglePlayerService } from "./ISinglePlayerService";
import { IPLayerService } from "./IPlayerService";

test("Creating a singlePlayer game should return the id of the singlePlayer game", async () => {
    const sp: ISinglePlayerService = new singlePlayerService();
    const playerService: IPLayerService = PlayerService.getInstance();
    let createdPlayer = await playerService.createPlayer(1,"ptest");
    let createdGame = await sp.createSinglePlayerGame(1);
    let game = await sp.getSinglePlayerGame(createdGame);
    expect(game.game.id).toBe(createdGame);
});

test("getting a singleplayergame that does not exist should throw an error", async () => {
    const sp: ISinglePlayerService = new singlePlayerService();
    try{
        let game = await sp.getSinglePlayerGame(999);
        expect(game).toThrow("No matching single player game");
    }catch(e){
    }
});

test("creating a singleplayer game with a non-existing player should throw an error", async () => {
    const sp: ISinglePlayerService = new singlePlayerService();
    try{
        let game = await sp.createSinglePlayerGame(988);
        expect(game).toThrow("Player not found");
    }catch(e){
    }
});