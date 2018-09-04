// 248 Game - JavaScript, Jquery 
// Write by Trac Quang Hoa, 2018

function GameLogic(xSize, ySize) {
    var board = [];
    var countEmptyTile = xSize * ySize;

    this.initGameBoard = function () {
        for (let i = 0; i < xSize; i++) {
            let row = [];
            for (let j = 0; j < ySize; j++) {
                row.push(0);
            }

            board.push(row);
        }
    }

    this.putRandomTile = function (callback) {
        var position = Math.floor(Math.random() * countEmptyTile);
        for (let i = 0; i < xSize; i++) {
            for (let j = 0; j < ySize; j++) {
                if (board[i][j] == 0 && position-- == 0) {
                    board[i][j] = 2;
                    countEmptyTile--;
                    return callback({ x: i, y: j }, board[i][j]);
                }
            }
        }
    }

    this.moveUp = function (callback) {

        // Go though all columns
        for (let i = 0; i < xSize; i++) {

            // Point to the position where a tile can move to or merge with
            let p = 0;
            let j = p + 1;
            while (j < ySize) {

                // There is a tile at (i, j) that needs to process (move, merge or nothing)
                if (board[i][j] != 0) {

                    // No tile at (i, p)
                    if (board[i][p] == 0) {

                        // Just move (i, j) to (i, p)}
                        move({ x: i, y: j }, { x: i, y: p }, callback);

                        // (i, j) has been processed, continue with the next tile
                        j++;
                    } else {

                        // (i, p) and (i, j) can be merged
                        if (board[i][p] == board[i][j]) {

                            // Merge (i, j) with (i, p)
                            merge({ x: i, y: j }, { x: i, y: p }, callback);

                            // (i, j) has been processed, continue with the next tile
                            j++;

                            // (i, p) has been merged, so p points to the next tile
                            p++;
                        } else {

                            // (i, p) cannot be merged, so p points to the next tile
                            p++;

                            // (i, j) cannot be moved or merged, continue with the next tile 
                            if (p == j) {
                                j++;
                            }
                        }
                    }
                } else {

                    // No title that needs to process at (i, j) then ignore this position and continue with the next position
                    j++;
                }
            }
        }

        console.debug(board);
    }

    this.moveDown = function (callback) {

        // Go though all columns
        for (let i = 0; i < xSize; i++) {

            // Point to the position where a tile can move to or merge with
            let p = ySize - 1;
            let j = p - 1;
            while (j >= 0) {
                if (board[i][j] != 0) {

                    // No tile at (i, p)
                    if (board[i][p] == 0) {

                        // Just move (i, j) to (i, p)}
                        move({ x: i, y: j }, { x: i, y: p }, callback);
                        j--;
                    } else {

                        // (i, p) and (i, j) can be merged
                        if (board[i][p] == board[i][j]) {

                            // Merge (i, j) with (i, p)
                            merge({ x: i, y: j }, { x: i, y: p }, callback);
                            j--;

                            p--
                        } else {
                            p--;
                            if (p == j) {
                                j--;
                            }
                        }
                    }
                } else {
                    j--;
                }
            }
        }

        console.debug(board);
    }

    this.moveLeft = function (callback) {

        // Go though all rows
        for (let j = 0; j < ySize; j++) {

            // Processing pointer
            let p = 0;
            let i = p + 1;
            while (i < xSize) {
                if (board[i][j] != 0) {

                    // No tile at (p, j)
                    if (board[p][j] == 0) {

                        // Just move (i, j) to (p, j)}
                        move({ x: i, y: j }, { x: p, y: j }, callback);
                        i++;
                    } else {

                        // (p, j) and (i, j) can be merged
                        if (board[p][j] == board[i][j]) {

                            // Merge (i, j) with (i, p)
                            merge({ x: i, y: j }, { x: p, y: j }, callback);
                            i++;

                            p++;
                        } else {
                            p++;
                            if (p == i) {
                                i++;
                            }
                        }
                    }
                } else {
                    i++;
                }
            }
        }

        console.debug(board);
    }

    this.moveRight = function (callback) {
        // Go though all rows
        for (let j = 0; j < ySize; j++) {

            // Processing pointer
            let p = xSize - 1;
            let i = p - 1;
            while (i >= 0) {
                if (board[i][j] != 0) {

                    // No tile at (p, j)
                    if (board[p][j] == 0) {

                        // Just move (i, j) to (p, j)}
                        move({ x: i, y: j }, { x: p, y: j }, callback);
                        i--;
                    } else {

                        // (p, j) and (i, j) can be merged
                        if (board[p][j] == board[i][j]) {

                            // Merge (i, j) with (p, j)
                            merge({ x: i, y: j }, { x: p, y: j }, callback);
                            i--;
                            p--;
                        } else {
                            p--;
                            if (p == i) {
                                i--;
                            }
                        }
                    }
                } else {
                    i--;
                }
            }
        }

        console.debug(board);
    }

    this.clearGameBoard = function () {
        for (let i = 0; i < xSize; i++) {
            for (let j = 0; j < ySize; j++) {
                board[i][j] = 0;
            }
        }

        countEmptyTile = xSize * ySize;
    }

    function move(from, to, callback) {
        board[to.x][to.y] = board[from.x][from.y];
        board[from.x][from.y] = 0;
        callback(from, to);
    }

    function merge(from, to, callback) {
        board[to.x][to.y] += board[from.x][from.y];
        board[from.x][from.y] = 0;
        callback(from, to, board[to.x][to.y]);

        // A merge leaves a position empty 
        countEmptyTile++;
    }
}