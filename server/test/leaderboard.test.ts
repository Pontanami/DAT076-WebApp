import { LeaderboardService } from "../src/service/leaderboard";

test("If a playeris added to the leaderboard they should be on the leadeboard", async () => {
    const leaderboardService = new LeaderboardService();
    let newPlayer = {
        name: "test",
        id: Date.now(),
        score: 0   
    }
    leaderboardService.addLeaderboardEntry(newPlayer.id, newPlayer.name, newPlayer.score);
    const player_list = (await leaderboardService.getLeaderboard()).player_entries;
    expect(player_list).toContainEqual(newPlayer);
});