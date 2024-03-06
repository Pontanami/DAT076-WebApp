import { Player } from "../model/player";
import { PlayerService } from "../service/player"

test("If a player is created it should be in the list of players", async () => {
    const playerService = PlayerService.getInstance();
    let createdPlayer = await playerService.createPlayer(1,"ptest");
    let allPlayers = await playerService.getPlayers();
    expect(allPlayers.map((player: Player) => player.id)).toContain(createdPlayer.id);
});

test("If a player is created it should be the same player as when you get it by id", async () => {
    const playerService = PlayerService.getInstance();
    let createdPlayer = await playerService.createPlayer(2,"ptest2");
    let recievedPlayer = await playerService.getPlayer(createdPlayer.id);
    expect(recievedPlayer).toEqual(createdPlayer);
})

test("If a player score is updated the score should be updated when you get the player", async () => {
    const playerService = PlayerService.getInstance();
    let createdPlayer = await playerService.createPlayer(3,"ptest3");

    await playerService.updatePlayerScore(createdPlayer.id);

    let recievedPlayer = await playerService.getPlayer(createdPlayer.id);
    expect(recievedPlayer).toEqual(createdPlayer);
})

test("If a player's score is reset the score should be 0 when you get the player", async () => {
    const playerService = PlayerService.getInstance();
    let createdPlayer = await playerService.createPlayer(4,"ptest4");

    await playerService.updatePlayerScore(createdPlayer.id);
    await playerService.resetPlayerScore(createdPlayer.id);

    let recievedPlayer = await playerService.getPlayer(createdPlayer.id);
    expect(recievedPlayer.score).toBe(0);
})