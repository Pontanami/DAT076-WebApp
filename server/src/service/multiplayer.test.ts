import { multiPlayerService } from "./multiPlayer";

let mp: multiPlayerService;

beforeAll(() => {
    mp = new multiPlayerService();
});

test("Creating a multiplayer game should return the id of the multiplayer game", async () => {
    let player = await mp.playerService.createPlayer(1,"mptest");
    let game = await mp.createMultiPlayerGame(player.id);
    let storedGame = await mp.gameService.getGame(game.game.id);
    expect(game.game.id).toBe(storedGame.id);
});

test("Joining a multiplayer game should return true", async () => {
    let player = await mp.playerService.createPlayer(99,"mptest");
    let mpGame = await mp.createMultiPlayerGame(player.id);
    let joined = await mp.joinMultiPlayerGame(mpGame.game.id,player.id);
    expect(joined).toBe(true);
});

test("Getting players from a multiplayer game should return a list of players", async () => {
    let game = mp.mpGames[0];
    try{
        await mp.joinMultiPlayerGame(game.game.id,1);
        await mp.joinMultiPlayerGame(game.game.id,99);
    }catch(e){
        console.log(e);
    }
    let players = await mp.getPlayers(game.game.id);
    expect(players.length).toBe(2);
});