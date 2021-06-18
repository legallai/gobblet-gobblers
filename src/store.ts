import { createStore } from "vuex";

enum Color {
    Green = "GREEN",
    Red = "RED",
}

enum Size {
    "one" = 1,
    "two" = 2,
    "three" = 3,
}

interface State {
    board: Array<Array<null | Gobbler>>;
    playerOnePool: Array<Gobbler>;
    playerTwoPool: Array<Gobbler>;
}

interface Coordinates {
    x: number;
    y: number;
}

class Gobbler {
    color: string;
    size: number;

    constructor(color: Color, size: Size) {
        this.color = color;
        this.size = size;
    }
}

function checkRules(
    state: State,
    {
        coordinates: { x, y },
        size,
    }: { coordinates: Coordinates; color: Color; size: Size }
) {
    const pieceAtCoords = state.board[x][y];
    if (pieceAtCoords === null) {
        return true;
    } else if (pieceAtCoords.size < size) {
        return true;
    }
    return false;
}

export const store = createStore({
    state(): State {
        return {
            board: [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ],
            playerOnePool: [
                new Gobbler(Color.Green, 1),
                new Gobbler(Color.Green, 1),
                new Gobbler(Color.Green, 2),
                new Gobbler(Color.Green, 2),
                new Gobbler(Color.Green, 3),
                new Gobbler(Color.Green, 3),
            ],
            playerTwoPool: [
                new Gobbler(Color.Red, 1),
                new Gobbler(Color.Red, 1),
                new Gobbler(Color.Red, 2),
                new Gobbler(Color.Red, 2),
                new Gobbler(Color.Red, 3),
                new Gobbler(Color.Red, 3),
            ],
        };
    },
    getters: {
        hasWon(state: State): boolean {
            // 1, 1, 1, ., ., ., ., ., .
            // ., ., ., 1, 1, 1, ., ., .
            // ., ., ., ., ., ., 1, 1, 1
            // 1, ., ., 1, ., ., 1, ., .
            // ., 1, ., ., 1, ., ., 1, .
            // ., ., 1, ., ., 1, ., ., 1
            // 1, ., ., ., 1, ., ., ., 1
            // ., ., 1, ., 1, ., 1, ., .

            // 0 1 2
            // 3 4 5
            // 6 7 8
            // 0 3 6
            // 1 4 7
            // 0 4 8
            // 2 4 6

            const board = state.board.flat();

            const checkCases = (color: Color) => {
                if (
                    board[0]?.color === color &&
                    board[1]?.color === color &&
                    board[2]?.color === color
                ) {
                    return true;
                } else if (
                    board[3]?.color === color &&
                    board[4]?.color === color &&
                    board[5]?.color === color
                ) {
                    return true;
                } else if (
                    board[6]?.color === color &&
                    board[7]?.color === color &&
                    board[8]?.color === color
                ) {
                    return true;
                } else if (
                    board[0]?.color === color &&
                    board[3]?.color === color &&
                    board[6]?.color === color
                ) {
                    return true;
                } else if (
                    board[1]?.color === color &&
                    board[4]?.color === color &&
                    board[7]?.color === color
                ) {
                    return true;
                } else if (
                    board[0]?.color === color &&
                    board[4]?.color === color &&
                    board[8]?.color === color
                ) {
                    return true;
                } else if (
                    board[2]?.color === color &&
                    board[4]?.color === color &&
                    board[6]?.color === color
                ) {
                    return true;
                } else {
                    return false;
                }
            };

            console.log(checkCases(Color.Red));
            console.log(checkCases(Color.Green));

            return checkCases(Color.Red) || checkCases(Color.Green);
        },
    },
    mutations: {
        addGobbler(state, payload) {
            const {
                coordinates: { x, y },
                color,
                size,
                poolIndex,
            }: {
                coordinates: Coordinates;
                color: Color;
                size: Size;
                poolIndex: number;
            } = payload;
            if (checkRules(state, payload)) {
                state.board[x][y] = new Gobbler(color, size);
                const pool = color === Color.Red ? 1 : 0;
                store.commit("removeFromPool", { pool, poolIndex });
            }
        },
        removeGobbler(state, { x, y }: Coordinates) {
            state.board[x][y] = null;
        },
        removeFromPool(state, { pool, poolIndex }) {
            // console.log(pool);
            if (pool === 0) {
                state.playerOnePool.splice(poolIndex, 1);
            } else {
                state.playerTwoPool.splice(poolIndex, 1);
            }
        },
    },
});
