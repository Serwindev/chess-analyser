var fen = "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK1R1";
let board;

var init = function() {
    board = new Chessboard('myBoard', fen);
    const grid = convertIntogrid(board.position());
    analyseMoves(grid);
};

const whiteAttack = Array.from( {length: 8}, () => Array(8).fill(0));
const blackAttack = Array.from( {length: 8}, () => Array(8).fill(0));

document.addEventListener("DOMContentLoaded", init);

function convertIntogrid(position) {
    const columns = {
        'a': 0,
        'b': 1,
        "c": 2,
        "d": 3,
        "e": 4,
        "f": 5,
        "g": 6,
        "h": 7
    };

    const grid = Array.from( {length: 8}, () => Array(8).fill(0) );
    for (let pos in position) {
        let col = columns[pos[0]];
        let row = 8 - parseInt(pos[1]);
        
        grid[row][col] = position[pos];
    }

    return grid;
}

function analyseMoves(grid) {
    for (let row in grid) {
        for (let col in grid[row]) {
            if (grid[row][col] == "wN") {
                // Knight
                checkKnight(parseInt(row), parseInt(col), grid, "w");
            } else if (grid[row][col] == "wK") {
                // king
                checkKing(parseInt(row), parseInt(col), grid, "w");
            } else if (grid[row][col] == "wR") {
                // Rook
                checkRook(parseInt(row), parseInt(col), grid, "w");
            } else if (grid[row][col] == "wB") {
                // Bishop
                checkBishop(parseInt(row), parseInt(col), grid, "w");
            } else if (grid[row][col] == "wQ") {
                // Queen
                checkQueen(parseInt(row), parseInt(col), grid, "w");
            } else if (grid[row][col] == "bN") {
                // Knight Black
                checkKnight(parseInt(row), parseInt(col), grid, "b");
            } else if (grid[row][col] == "bK") {
                // King black
                checkKing(parseInt(row), parseInt(col), grid, "b");
            } else if (grid[row][col] == "bR") {
                // Rook black
                checkRook(parseInt(row), parseInt(col), grid, "b");
            } else if (grid[row][col] == "bB") {
                // Bishop black
                checkBishop(parseInt(row), parseInt(col), grid, "b");
            } else if (grid[row][col] == "bQ") {
                // Queen black
                checkQueen(parseInt(row), parseInt(col), grid, "b");
            }
        }
    }
}

function checkKing(row, col, grid, color) {
    let possibleMoves = [[row+1, col], [row-1, col], [row, col+1], [row, col-1], [row+1, col+1], [row-1, col-1], [row+1, col-1], [row-1, col+1]];

    for (const moves of possibleMoves) {
        if (moves[0] <= 7 && moves[1] <=7 && moves[0] >= 0 && moves[1] >= 0) {
            if (color == "w") {
                whiteAttack[moves[0]][moves[1]] = whiteAttack[moves[0]][moves[1]]+1;
            } else {
                blackAttack[moves[0]][moves[1]] = 1;
            }
        }
    }
}

function checkKnight(row, col, grid, color) {
    let possibleMoves = [[row-1, col+2], [row-1, col-2], [row-2, col+1], [row-2, col-1], [row+1, col+2], [row+1, col-2], [row+2, col+1], [row+2, col-1]]

    for (const moves of possibleMoves) {
        if (moves[0] <= 7 && moves[1] <= 7 && moves[0] >= 0 && moves[1] >= 0) {
            if (color == "w") {
                whiteAttack[moves[0]][moves[1]] = whiteAttack[moves[0]][moves[1]] + 1;
            } else {
                blackAttack[moves[0]][moves[1]] = 1;
            }
        }
    }
}

function checkRook(row, col, grid, color) {
    checkStraight(row, col, grid, color);
}

function checkBishop(row, col, grid, color) {
    checkDiagonal(row, col, grid, color);
}

function checkQueen(row, col, grid, color) {
    checkStraight(row, col, grid, color);
    checkDiagonal(row, col, grid, color);
}

function checkStraight(row, col, grid, color) {
    for (let i = 1; i<row; i++) { // UP
        if (grid[row-i][col] != 0) {
            if (color == "w") {
                whiteAttack[row-i][col] = whiteAttack[row-i][col] + 1;
            } else {
                blackAttack[row-i][col] = 1;
            }
            break;
        } else {
            if (color == "w") {
                whiteAttack[row-i][col] = whiteAttack[row-i][col] + 1;
            } else {
                blackAttack[row-i][col] = 1;
            }
        }
    }

    for (let i = 1; i<8-row; i++) { // DOWN
        if (grid[row+i][col] != 0) {
            if (color == "w") {
                whiteAttack[row+i][col] = whiteAttack[row+i][col] + 1;
            } else {
                blackAttack[row+i][col] = 1;
            }
            break;
        } else {
            if (color == "w") {
                whiteAttack[row+i][col] = whiteAttack[row+i][col] + 1;
            } else {
                blackAttack[row+i][col] = 1;
            }
        }
    }

    for (let i = 1; i<col; i++) { // LEFT
        if (grid[row][col-i] != 0) {
            if (color == "w") {
                whiteAttack[row][col-i] = whiteAttack[row][col-i] + 1;
            } else {
                blackAttack[row][col-i] = 1;
            }
            break;
        } else {
            if (color == "w") {
                whiteAttack[row][col-i] = whiteAttack[row][col-i] + 1;
            } else {
                blackAttack[row][col-i] = 1;
            }
        }
    }

    for (let i = 1; i<8-col; i++) { // RIGHT
        if (grid[row][col+i] != 0) {
            if (color == "w") {
                whiteAttack[row][col+i] = whiteAttack[row][col+i] + 1;
            } else {
                blackAttack[row][col+i] = 1;
            }
            break;
        } else {
            if (color == "w") {
                whiteAttack[row][col+i] = whiteAttack[row][col+i] + 1;
            } else {
                blackAttack[row][col+i] = 1;
            }
        }
    }
}

function checkDiagonal(row, col, grid, color) {
    for (let i = 1; i<8; i++) { // RIGHT UP
        if (row-i >= 0 && col+i <= 7) {
            if (grid[row-i][col+i] != 0) {
                if (color == "w") {
                    whiteAttack[row-i][col+i] = whiteAttack[row-i][col+i] + 1;
                } else {
                    blackAttack[row-i][col+i] = 1;
                }
                break;
            } else {
                if (color == "w") {
                    whiteAttack[row-i][col+i] = whiteAttack[row-i][col+i] + 1;
                } else {
                    blackAttack[row-i][col+i] = 1;
                }
            }
        }
    }

    for (let i = 1; i<8; i++) { // LEFT UP
        if (row-i >= 0 && col-i >= 0) {
            if (grid[row-i][col-i] != 0) {
                if (color == "w") {
                    whiteAttack[row-i][col-i] = whiteAttack[row-i][col-i] + 1;
                } else {
                    blackAttack[row-i][col-i] = 1;
                }
                break;
            } else {
                if (color == "w") {
                    whiteAttack[row-i][col-i] = whiteAttack[row-i][col-i] + 1;
                } else {
                    blackAttack[row-i][col-i] = 1;
                }
            }
        }
    }

    for (let i = 1; i<8; i++) { // RIGHT DOWN
        if (row+i <= 7 && col+i <= 7) {
            if (grid[row+i][col+i] != 0) {
                if (color == "w") {
                    whiteAttack[row+i][col+i] = whiteAttack[row+i][col+i] + 1;
                } else {
                    blackAttack[row+i][col+i] = 1;
                }
                break;
            } else {
                if (color == "w") {
                    whiteAttack[row+i][col+i] = whiteAttack[row+i][col+i] + 1;
                } else {
                    blackAttack[row+i][col+i] = 1;
                }
            }
        } 
    }

    for (let i = 1; i<8; i++) {
        if (row+i <= 7 && col-i >= 0) {
            if (grid[row+i][col-i] != 0) {
                if (color == "w") {
                    whiteAttack[row+i][col-i] = whiteAttack[row+i][col-i] + 1;
                } else {
                    blackAttack[row+i][col-i] = 1;
                }
                break;
            } else {
                if (color == "w") {
                    whiteAttack[row+i][col-i] = whiteAttack[row+i][col-i] + 1;
                } else {
                    blackAttack[row+i][col-i] = 1;
                }
            }
        }
    }
}

console.log(whiteAttack);
console.log(blackAttack);