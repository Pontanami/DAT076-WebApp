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