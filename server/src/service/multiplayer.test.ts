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

test("joining a non-existing multiplayer game should throw an error", async () => {
    try{
        const request = await mp.joinMultiPlayerGame(999,1);
        expect(request).toThrow("Game not found!");
    }catch(e){
    }
});

test("getting players from a non-existing multiplayer game should throw an error", async () => {
    try{
        const request = await mp.getPlayers(999);
        expect(request).toThrow("Game not found!");
    }catch(e){
    }
});