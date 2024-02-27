import { Player } from "../model/player";
import { PlayerService } from "../service/player"

test("If a player is created it should be in the list of players", async () => {
    const playerService = PlayerService.getInstance();
    let createdPlayer = await playerService.createPlayer("test");
    let allPlayers = await playerService.getPlayers();
    expect(allPlayers.map((player: Player) => player.id)).toContain(createdPlayer.id);
});

test("If a player is created it should be the same player as when you get it by id", async () => {
    const playerService = PlayerService.getInstance();
    let createdPlayer = await playerService.createPlayer("test2");
    let recievedPlayer = await playerService.getPlayer(createdPlayer.id);
    expect(recievedPlayer).toEqual(createdPlayer);
})

test("If a player score is updated the score should be updated when you get the player", async () => {
    const playerService = PlayerService.getInstance();
    let createdPlayer = await playerService.createPlayer("test3");

    await playerService.updatePlayerScore(createdPlayer.id);

    let recievedPlayer = await playerService.getPlayer(createdPlayer.id);
    expect(recievedPlayer).toEqual(createdPlayer);
})