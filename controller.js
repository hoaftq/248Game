// 248 Game - JavaScript, Jquery 
// Write by Trac Quang Hoa, 2018

var X_SIZE = 4;
var Y_SIZE = 4;

// Size ratio between the tile and its padding
var PADDING_RATIO = 10;

function GameController(container) {

    var direct = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right'
    };

    var that = this;

    var tileSize;
    var padding;

    var logic;
    var view;

    var $container = $(container);
    this.bestScore = 0;

    calTileSizeAndPadding();

    this.start = function () {
        logic = new GameLogic(X_SIZE, Y_SIZE);
        view = new GameView(X_SIZE, Y_SIZE, tileSize, padding, 100);

        logic.initGameBoard();
        view.init($container, function () {

            // Create a new game when clicking new game button
            newGame();
        });

        // This will make the game board centered in the page
        $container.width(view.width());

        $container.off('swipeleft').on('swipeleft', function (e) {
            move('left');
        }).off('swiperight').on('swiperight', function (e) {
            move('right');
        }).off('swipeup').on('swipeup', function (e) {
            move('up');
        }).off('swipedown').on('swipedown', function (e) {
            move('down');
        });

        // Register key handler for the game
        $(document).off('keydown').keydown(function (e) {

            // If the key is not one of the arrows then ignore it
            if (!direct[e.key]) {
                return;
            }

            // Move tiles according to the direction
            move(direct[e.key]);

            e.preventDefault();
        });

        // Create a new game for a first time
        newGame();
    }

    /**
     * Move tiles with given direct
     * @param {*} direct 
     */
    function move(direct) {

        logic.move(direct,

            // Render movement on view
            function (from, to, newValue) {
                view.move(from, to, newValue);
            },

            // Render new score
            function (score, addedScore) {
                view.score(score);
                if (score > that.bestScore) {
                    // Save a new best score
                    that.bestScore = score;

                    // Display the best score
                    view.bestScore(that.bestScore);
                }
            });

        // Put a new random tile
        setTimeout(function () {
            logic.putRandomTile(function (pos, text) {
                view.putAt(pos, text);
                if (logic.isGameOver()) {
                    view.gameOver();
                }
            });
        }, 150);
    }

    function newGame() {
        logic.clearGameBoard();
        view.clear();

        // Create 2 new random tiles
        var i;
        for (i = 0; i < 2; i++) {
            logic.putRandomTile(function (pos, text) {
                view.putAt(pos, text);
            });
        }
    }

    /**
     * Calculate title size and padding according to page size
     */
    function calTileSizeAndPadding() {
        var maxSize = Math.min($(document).width(), $(document).height() * Y_SIZE / (Y_SIZE + 1));
        var size = maxSize - 3 * maxSize / X_SIZE / PADDING_RATIO;
        padding = size / X_SIZE / PADDING_RATIO;
        tileSize = (PADDING_RATIO - 1) * padding;
    }
}