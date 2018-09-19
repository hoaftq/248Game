// 248 Game - JavaScript, Jquery 
// Write by Trac Quang Hoa, 2018

function GameLogic(xSize, ySize) {
    var board = [];
    var countEmptyTile = xSize * ySize;
    var score = 0;

    /**
     * Initalize an empty game board
     */
    this.initGameBoard = function () {
        var i, j, row;
        for (i = 0; i < xSize; i++) {
            row = [];
            for (j = 0; j < ySize; j++) {
                row.push(0);
            }

            board.push(row);
        }
    }

    /**
     * Clear the game board
     */
    this.clearGameBoard = function () {
        var i, j;
        for (i = 0; i < xSize; i++) {
            for (j = 0; j < ySize; j++) {
                board[i][j] = 0;
            }
        }

        countEmptyTile = xSize * ySize;
        score = 0;
    }

    /**
     * Put a random value either 2 or 4 to a random 
     * @param {*} callback 
     */
    this.putRandomTile = function (callback) {
        var i, j, position = Math.floor(Math.random() * countEmptyTile);
        for (i = 0; i < xSize; i++) {
            for (j = 0; j < ySize; j++) {
                if (board[i][j] == 0 && position-- == 0) {
                    board[i][j] = randomValue();
                    countEmptyTile--;
                    return callback({ x: i, y: j }, board[i][j]);
                }
            }
        }
    }

    /**
     * Check if the game is over.
     * This is when it can not be putted a new tile to the board
     */
    this.isGameOver = function () {
        var i, j;
        for (i = 0; i < xSize; i++) {
            for (j = 0; j < ySize; j++) {

                // There is still empty tile
                if (board[i][j] == 0) {
                    return false;
                }

                // 2 tiles in a row that can be merged together
                if (j + 1 < ySize && board[i][j] == board[i][j + 1]) {
                    return false;
                }

                // 2 tiles in a column that can be merged together
                if (i + 1 < xSize && board[i][j] == board[i + 1][j]) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Move tiles to given direction
     * @param {*} direct 
     * @param {*} callback 
     * @param {*} scoreCallback 
     */
    this.move = function (direct, callback, scoreCallback) {
        switch (direct) {
            case 'up':
                moveUp(callback, scoreCallback);
                break;
            case 'down':
                moveDown(callback, scoreCallback);
                break;
            case 'left':
                moveLeft(callback, scoreCallback);
                break;
            case 'right':
                moveRight(callback, scoreCallback);
                break;
        }
    }

    function moveUp(callback, scoreCallback) {

        // Go though all columns
        var i;
        for (i = 0; i < xSize; i++) {

            // Point to the position where a tile can move to or merge with
            // Initialize it with the first row
            var p = 0,
                j = p + 1;
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
                            merge({ x: i, y: j }, { x: i, y: p }, callback, scoreCallback);

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
    }

    function moveDown(callback, scoreCallback) {

        // Go though all columns
        var i;
        for (i = 0; i < xSize; i++) {

            // Point to the position where a tile can move to or merge with
            // Initialize it with the last row
            var p = ySize - 1,
                j = p - 1;
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
                            merge({ x: i, y: j }, { x: i, y: p }, callback, scoreCallback);
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
    }

    function moveLeft(callback, scoreCallback) {

        // Go though all rows
        var j;
        for (j = 0; j < ySize; j++) {

            // Processing pointer
            var p = 0, i = p + 1;
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
                            merge({ x: i, y: j }, { x: p, y: j }, callback, scoreCallback);
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
    }

    function moveRight(callback, scoreCallback) {

        // Go though all rows
        var j;
        for (j = 0; j < ySize; j++) {

            // Processing pointer
            var p = xSize - 1,
                i = p - 1;
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
                            merge({ x: i, y: j }, { x: p, y: j }, callback, scoreCallback);
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
    }

    /**
     * Move the tile at {from} to {to}
     * @param {*} from 
     * @param {*} to 
     * @param {*} callback 
     */
    function move(from, to, callback) {
        board[to.x][to.y] = board[from.x][from.y];
        board[from.x][from.y] = 0;
        if (callback) {
            callback(from, to);
        }
    }

    /**
     * Merge the tile at {from} with the tile at {to}
     * @param {*} from 
     * @param {*} to 
     * @param {*} callback 
     * @param {*} scoreCallback 
     */
    function merge(from, to, callback, scoreCallback) {
        board[to.x][to.y] += board[from.x][from.y];
        board[from.x][from.y] = 0;
        if (callback) {
            callback(from, to, board[to.x][to.y]);
        }

        if (scoreCallback) {
            scoreCallback(score += board[to.x][to.y], board[to.x][to.y]);
        }

        // A merge leaves a position empty 
        countEmptyTile++;
    }

    /**
     * Make a random value of either 2 or 4.
     * 75% chance for 2 and 25% chance for 4
     */
    function randomValue() {
        if (Math.random() < 0.75) {
            return 2;
        }

        return 4;
    }
}