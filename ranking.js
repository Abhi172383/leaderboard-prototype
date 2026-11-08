
function rankScores(players) {
    // Validate player data
    for (const player of players) {
        if (
            !player.playerId ||
            typeof player.score !== "number" ||
            !Number.isFinite(player.score) ||
            player.score < 0
        ) {
            throw new Error("Invalid player data");
        }
    }

    // Sort by score: highest first
    players.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }

        // If scores are equal, sort by player ID
        return a.playerId.localeCompare(b.playerId);
    });

    // Assign ranks
    return players.map((player, index) => ({
        rank: index + 1,
        playerId: player.playerId,
        score: player.score
    }));
}

// Sample players
const players = [
    { playerId: "P1", score: 500 },
    { playerId: "P2", score: 900 },
    { playerId: "P3", score: 700 }
];

console.log(rankScores(players));
