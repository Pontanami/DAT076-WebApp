import { Player } from "../model/player";
import { LeaderboardService } from "../service/leaderboard";
import { PlayerService } from "./player";

jest.mock("../db/conn.ts");

test("If a player is added to the leaderboard they should be on the leadeboard", async () => {
    const leaderboardService = new LeaderboardService();
    let playerService = PlayerService.getInstance();
    let player =  await playerService.createPlayer(5,"test5")
    await leaderboardService.changeLeaderboard(player.id);
    const player_list = await leaderboardService.getPlayerEntries();
    expect(player_list.map((ply: Player) => ply.id)).toContain(player.id);
});

test("If a player is posted with the same id and a higher score, the score should be updated", async () => {
    const leaderboardService = new LeaderboardService();
    let playerService = PlayerService.getInstance();
    let player = await playerService.createPlayer(6,"test6")
    await leaderboardService.changeLeaderboard(player.id);
    player.score = 10;
    await leaderboardService.changeLeaderboard(player.id);
    const player_list = await leaderboardService.getPlayerEntries();
    expect(player_list.map((player: Player) => player.score)).toContain(10);
});

test("If a player is posted with the same id and a lower score, the score should not be updated", async () => {
    const leaderboardService = new LeaderboardService();
    let playerService = PlayerService.getInstance();
    let player = await playerService.createPlayer(7,"test7")
    await leaderboardService.changeLeaderboard(player.id);
    player.score = 10;
    await leaderboardService.changeLeaderboard(player.id);
    player.score = 5;
    await leaderboardService.changeLeaderboard(player.id);
    const player_list = await leaderboardService.getPlayerEntries();
    expect(player_list.map((player: Player) => player.score)).toContain(10);
});