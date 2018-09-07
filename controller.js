// 248 Game - JavaScript, Jquery 
// Write by Trac Quang Hoa, 2018

const X_SIZE = 4;
const Y_SIZE = 4;

function GameController() {
    const direct = {
        ArrowUp: 'up',
        ArrowDown: 'down',
        ArrowLeft: 'left',
        ArrowRight: 'right'
    };

    var that = this;
    var logic;
    var view;
    this.bestScore = 0;

    this.newGame = function () {
        initGame();

        // Create 2 new random tile
        for (let i = 0; i < 2; i++) {
            logic.putRandomTile(function (pos, text) {
                view.putAt(pos, text);
            });
        }

        // Register key handler for the game
        $(document).off('keydown').keydown(function (e) {

            // If the key is not one of the arrows then ignore it
            if (!direct[e.key]) {
                return;
            }

            // Move tile according to the direction
            logic.move(
                direct[e.key],

                // Render movement on view
                function (from, to, newText) {
                    view.move(from, to, newText);
                },

                // Render new score
                function (score, addedScore) {
                    $('#score').text(score);

                    if (score > that.bestScore) {
                        that.bestScore = score;
                        $('#highest').text(that.bestScore);
                    }
                });

            setTimeout(function () {
                logic.putRandomTile(function (pos, text) {
                    view.putAt(pos, text);
                    if (logic.isGameOver()) {
                        view.gameOver();
                    }
                });
            }, 150);

        });
    }

    function initGame() {

        // First time enter the page
        if (!(logic && view)) {
            logic = new GameLogic(X_SIZE, Y_SIZE);
            view = new GameView(X_SIZE, Y_SIZE, 80, 10, 100);

            logic.initGameBoard();
            view.init('#container');
        } else {
            // Click New Game button
            logic.clearGameBoard();
            view.clear();
        }

        $('#score').text(0);
        $('#highest').text(that.bestScore);
    }
}