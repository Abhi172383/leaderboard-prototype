
function rankScores(players) {
    if (!Array.isArray(players)) {
        throw new TypeError("players must be an array");
    }

    const seen = new Set();

    for (const p of players) {
        if (
            !p ||
            typeof p.playerId !== "string" ||
            p.playerId.trim() === ""
        ) {
            throw new Error("Invalid playerId");
        }

        if (seen.has(p.playerId)) {
            throw new Error("Duplicate playerId");
        }

        seen.add(p.playerId);

        if (
            !Number.isSafeInteger(p.score) ||
            p.score < 0
        ) {
            throw new Error("Invalid score");
        }
    }

    return [...players]
        .sort((a, b) =>
            (b.score - a.score) ||
            a.playerId.localeCompare(b.playerId)
        )
        .map((p, index) => ({
            ...p,
            rank: index + 1
        }));
}

const tests = [
    {
        name: "Different scores",
        input: [
            { playerId: "A", score: 900 },
            { playerId: "B", score: 500 }
        ],
        expected: ["A", "B"]
    },
    {
        name: "Equal scores",
        input: [
            { playerId: "B", score: 500 },
            { playerId: "A", score: 500 }
        ],
        expected: ["A", "B"]
    },
    {
        name: "Empty array",
        input: [],
        expected: []
    },
    {
        name: "Minimum score zero",
        input: [{ playerId: "A", score: 0 }],
        expected: ["A"]
    },
    {
        name: "Negative score",
        input: [{ playerId: "A", score: -1 }],
        error: "Invalid score"
    },
    {
        name: "Duplicate player ID",
        input: [
            { playerId: "A", score: 500 },
            { playerId: "A", score: 400 }
        ],
        error: "Duplicate playerId"
    },
    {
        name: "Unsafe integer",
        input: [
            { playerId: "A", score: 9007199254740992 }
        ],
        error: "Invalid score"
    },
    {
        name: "Null player",
        input: [null],
        error: "Invalid playerId"
    }
];

let passed = 0;

for (const test of tests) {
    try {
        const result = rankScores(test.input);

        if (test.error) {
            console.log("FAIL:", test.name);
        } else {
            const actual = result.map(p => p.playerId);

            if (JSON.stringify(actual) === JSON.stringify(test.expected)) {
                console.log("PASS:", test.name);
                passed++;
            } else {
                console.log("FAIL:", test.name);
            }
        }
    } catch (error) {
        if (test.error && error.message === test.error) {
            console.log("PASS:", test.name);
            passed++;
        } else {
            console.log("FAIL:", test.name, error.message);
        }
    }
}

console.log(`\nPassed: ${passed}/${tests.length}`);
console.log(
    `Test execution pass rate: ${(passed / tests.length) * 100}%`
);

if (passed !== tests.length) {
    process.exitCode = 1;
}