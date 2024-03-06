import Player from "../IPlayer"
import LeaderboardPlayer from "./LeaderboardPlayer"

function DisplayLeaderboard({ playerList }: { playerList: Player[] }) {
    return (
        <div id="leaderboard">
            <div className="columnNames">
                <strong className="">Rank</strong>
                <strong className="">Name</strong>
                <strong className="">Score</strong>
            </div>
            <section className="row">
                {playerList.map((player: Player, index: number) =>
                    <LeaderboardPlayer player={player} index={index + 1} key={player.id} />
                )}
            </section>
        </div>
    )
}

export default DisplayLeaderboard