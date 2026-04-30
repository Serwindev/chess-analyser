let board;


let whiteAttack = Array.from( {length: 8}, () => Array(8).fill(0));
let blackAttack = Array.from( {length: 8}, () => Array(8).fill(0));

let attackedSquares = [];
let defendedSquares = [];
let hangingPieces = [];
let sweatingPieces = [];

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
            } else if (grid[row][col] == "wP") {
                // Pawn
                checkPawn(parseInt(row), parseInt(col), grid, "w");
            }
             else if (grid[row][col] == "bN") {
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
            } else if (grid[row][col] == "bP") {
                // Pawn black
                checkPawn(parseInt(row), parseInt(col), grid, "b");
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
                blackAttack[moves[0]][moves[1]] = blackAttack[moves[0]][moves[1]] + 1;
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
                blackAttack[moves[0]][moves[1]] = blackAttack[moves[0]][moves[1]] + 1;
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

function checkPawn(row, col, grid, color) {
    if (color == "w") {
        let possibleMoves = [[row-1, col+1], [row-1, col-1]];

        for (let moves of possibleMoves) {
            if (moves[0] >= 0 && moves[0] <= 7 && moves[1] >= 0 && moves[1] <= 7) {
                whiteAttack[moves[0]][moves[1]] = whiteAttack[moves[0]][moves[1]] + 1;
            }
        }
    } else {
        let possibleMoves = [[row+1, col-1], [row+1, col+1]];

        for (let moves of possibleMoves) {
            if (moves[0] >= 0 && moves[0] <= 7 && moves[1] >= 0 && moves[1] <= 7) {
                blackAttack[moves[0]][moves[1]] = blackAttack[moves[0]][moves[1]] + 1;
            }
        }
    }
}

function checkStraight(row, col, grid, color) {
    for (let i = 1; i<row; i++) { // UP
        if (grid[row-i][col] != 0) {
            if (color == "w") {
                whiteAttack[row-i][col] = whiteAttack[row-i][col] + 1;
            } else {
                blackAttack[row-i][col] = blackAttack[row-i][col] + 1;
            }
            break;
        } else {
            if (color == "w") {
                whiteAttack[row-i][col] = whiteAttack[row-i][col] + 1;
            } else {
                blackAttack[row-i][col] = blackAttack[row-i][col] + 1;
            }
        }
    }

    for (let i = 1; i<8-row; i++) { // DOWN
        if (grid[row+i][col] != 0) {
            if (color == "w") {
                whiteAttack[row+i][col] = whiteAttack[row+i][col] + 1;
            } else {
                blackAttack[row+i][col] = blackAttack[row+i][col] + 1;
            }
            break;
        } else {
            if (color == "w") {
                whiteAttack[row+i][col] = whiteAttack[row+i][col] + 1;
            } else {
                blackAttack[row+i][col] = blackAttack[row+i][col] + 1;
            }
        }
    }

    for (let i = 1; i<col; i++) { // LEFT
        if (grid[row][col-i] != 0) {
            if (color == "w") {
                whiteAttack[row][col-i] = whiteAttack[row][col-i] + 1;
            } else {
                blackAttack[row][col-i] = blackAttack[row][col-i] + 1;
            }
            break;
        } else {
            if (color == "w") {
                whiteAttack[row][col-i] = whiteAttack[row][col-i] + 1;
            } else {
                blackAttack[row][col-i] = blackAttack[row][col-i] + 1;
            }
        }
    }

    for (let i = 1; i<8-col; i++) { // RIGHT
        if (grid[row][col+i] != 0) {
            if (color == "w") {
                whiteAttack[row][col+i] = whiteAttack[row][col+i] + 1;
            } else {
                blackAttack[row][col+i] = blackAttack[row][col+i] + 1;
            }
            break;
        } else {
            if (color == "w") {
                whiteAttack[row][col+i] = whiteAttack[row][col+i] + 1;
            } else {
                blackAttack[row][col+i] = blackAttack[row][col+i] + 1;
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
                    blackAttack[row-i][col+i] = blackAttack[row-i][col+i] + 1;
                }
                break;
            } else {
                if (color == "w") {
                    whiteAttack[row-i][col+i] = whiteAttack[row-i][col+i] + 1;
                } else {
                    blackAttack[row-i][col+i] = blackAttack[row-i][col+i] + 1;
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
                    blackAttack[row-i][col-i] = blackAttack[row-i][col-i] + 1;
                }
                break;
            } else {
                if (color == "w") {
                    whiteAttack[row-i][col-i] = whiteAttack[row-i][col-i] + 1;
                } else {
                    blackAttack[row-i][col-i] = blackAttack[row-i][col-i] + 1;
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
                    blackAttack[row+i][col+i] = blackAttack[row+i][col+i] + 1;
                }
                break;
            } else {
                if (color == "w") {
                    whiteAttack[row+i][col+i] = whiteAttack[row+i][col+i] + 1;
                } else {
                    blackAttack[row+i][col+i] = blackAttack[row+i][col+i] + 1;
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
                    blackAttack[row+i][col-i] = blackAttack[row+i][col-i] + 1;
                }
                break;
            } else {
                if (color == "w") {
                    whiteAttack[row+i][col-i] = whiteAttack[row+i][col-i] + 1;
                } else {
                    blackAttack[row+i][col-i] = blackAttack[row+i][col-i] + 1;
                }
            }
        }
    }
}

function finalAnalyse(grid) {
    for (let row in grid) {
        for (let col in grid[row]) {
            if (grid[row][col] != 0) {
                if (String(grid[row][col]).startsWith("w")) {
                    if (blackAttack[row][col] != 0) {
                        attackedSquares.push([row, col]);
                    }
                } else {
                    if (whiteAttack[row][col] != 0) {
                        attackedSquares.push([row, col]);
                    }
                }

                if (String(grid[row][col]).startsWith("w")) {
                    if (whiteAttack[row][col] != 0) {
                        defendedSquares.push([row, col]);
                    }
                } else {
                    if (blackAttack[row][col]) {
                        defendedSquares.push([row, col]);
                    }
                }

                if (String(grid[row][col]).startsWith("w")) {
                    if (blackAttack[row][col] != 0) {
                        if (whiteAttack[row][col] == 0) {
                            hangingPieces.push([row, col]);
                        } else {
                            sweatingPieces.push([row, col]);
                        }
                    }
                } else {
                    if (whiteAttack[row][col] != 0) {
                        if (blackAttack[row][col] == 0) {
                            hangingPieces.push([row, col]);
                        } else {
                            sweatingPieces.push([row, col]);
                        }
                    }
                }
            }
        }
    }
}

function convertBack(row, col) {
    const columns = {
        0: "a",
        1: "b",
        2: "c", 
        3: "d", 
        4: "e",
        5: "f",
        6: "g",
        7: "h"
    }

    let rowNo = 8 - row;
    let colNo = columns[col];

    return String(colNo) + String(rowNo);
}

function addAnimation() {
    for (let pos of sweatingPieces) {
        let element = document.querySelector('[data-square="'+String(convertBack(pos[0], pos[1]))+'"]');
        element.classList.add("attacked");
        const sweatNode = document.createElement("div");
        sweatNode.innerHTML += '<svg class="sweat" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g transform="translate(15, 0) rotate(10, 50, 50)"><path d="M50 25 C 70 50, 75 75, 50 85 C 25 75, 30 50, 50 25 Z" fill="#3399FF" stroke="black" stroke-width="4" stroke-linejoin="round" /><path d="M58 55 C 62 65, 60 75, 55 80" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" /></g><g transform="translate(-20, 10) rotate(-15, 50, 50) scale(0.7)"><path d="M50 25 C 70 50, 75 75, 50 85 C 25 75, 30 50, 50 25 Z" fill="#3399FF" stroke="black" stroke-width="5" stroke-linejoin="round" /><path d="M58 55 C 62 65, 60 75, 55 80" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" /></g></svg>';
        element.appendChild(sweatNode);
    }

    for (let pos of defendedSquares) {
        let element = document.querySelector('[data-square="'+String(convertBack(pos[0], pos[1]))+'"]');
        element.classList.add("defended");
    }

    for (let pos of hangingPieces) {
        let element = document.querySelector('[data-square="'+String(convertBack(pos[0], pos[1]))+'"]');
        element.classList.add("hanging");
        const tensionNode = document.createElement("div");
        tensionNode.innerHTML += '<svg class="tension" viewBox="0 0 100 100"> <path d="M40 30 Q 50 50, 30 40" fill="none" stroke="red" stroke-width="8" stroke-linecap="round" /> <path d="M60 30 Q 55 45, 70 40" fill="none" stroke="red" stroke-width="8" stroke-linecap="round" /> <path d="M40 70 Q 45 55, 30 60" fill="none" stroke="red" stroke-width="8" stroke-linecap="round" /> <path d="M60 70 Q 55 55, 70 60" fill="none" stroke="red" stroke-width="8" stroke-linecap="round" /> </svg>';
        element.appendChild(tensionNode);
    }
}

const inputBtn = document.getElementById("inputFEN");
const inputBox = document.querySelector(".inputBtn");
const boardDOM = document.getElementById("myBoard");
const loadingTxt = document.getElementById("text-loading");
const generateBtn = document.getElementById("generateBtn");
const gimmeBtn = document.getElementById("gimmeBtn");

generateBtn.addEventListener("click", () => {
    generate();
});

function generate(fen = inputBtn.value, generateBtn1 = generateBtn) {
    inputBox.classList.add("up");
    reset();
    generateBtn1.disabled = true;
    generateBtn1.style.cursor = 'wait';
    var config = {
            position: fen,
            showErrors: 'alert'
        };
    setTimeout(() => {
        loadingTxt.style.display = "block";
    }, 200);
    
    setTimeout(() => {
        loadingTxt.style.display = "none";
        boardDOM.style.display = "block";
    }, 1000);

    setTimeout(() => {
        board = new Chessboard('myBoard', config);
        const grid = convertIntogrid(board.position());
        analyseMoves(grid);
        finalAnalyse(grid);
        addAnimation();
        generateBtn1.disabled = false;
        generateBtn1.style.cursor = 'default';
    }, 500);
}

gimmeBtn.addEventListener("click", () => {
    const fenList = [
        "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R",
        "r2q1rk1/pp2bppp/2npbn2/2p1p3/2P1P3/2NPBN2/PP2BPPP/R2Q1RK1",
        "r1bq1rk1/ppp2ppp/2n2n2/3pp3/3PP3/2P2N2/PP3PPP/RNBQ1RK1",
        "8/5pk1/6p1/4p3/4P3/6P1/5PK1/8",
        "rnb1kbnr/pppp1ppp/8/4q3/4P3/8/PPPP1PPP/RNBQKBNR",
        "2r3k1/p4p2/3p2p1/1p1Pb2p/2r1p2P/2P1BqP1/PP1Q1P2/2R1R1K1 w - - 1 26"
    ];

    const fen = fenList[Math.floor(Math.random() * fenList.length)];
    inputBtn.value = fen;
    generate(fen, gimmeBtn);
});

function reset() {
    whiteAttack = Array.from( {length: 8}, () => Array(8).fill(0));
    blackAttack = Array.from( {length: 8}, () => Array(8).fill(0));
    defendedSquares = [];
    attackedSquares = [];
    hangingPieces = [];
    sweatingPieces = [];

    const allPos = [...defendedSquares, ...attackedSquares, ...hangingPieces, ...sweatingPieces];

    for (let pos in allPos) {
        let element = document.querySelector('[data-square="'+String(convertBack(pos[0], pos[1]))+'"]');
        if (element) {
            element.classList.remove("attacked", "defended", "hanging");

            const animations = element.querySelectorAll(".sweat", ".tension");
            animations.forEach(node => node.parentElement.remove());
        }
    }
}