// 248 Game - JavaScript, Jquery 
// Write by Trac Quang Hoa, 2018

const X_SIZE = 4;
const Y_SIZE = 4;

function GameController() {
    this.bestScore = 0;

    this.newGame = function () {
        var logic = new GameLogic(X_SIZE, Y_SIZE);
        var view = new GameView(X_SIZE, Y_SIZE, 80, 10, 100);

        logic.initGameBoard();
        view.init('#container');

        for (let i = 0; i < 2; i++) {
            logic.putRandomTile(function (pos, text) {
                view.putAt(pos, text);
            });
        }

        $(document).keydown(function (e) {
            var direct;
            switch (e.key) {
                case 'ArrowUp':
                    direct = 'up';
                    break;

                case 'ArrowDown':
                    direct = 'down';
                    break;

                case 'ArrowLeft':
                    direct = 'left';
                    break;

                case 'ArrowRight':
                    direct = 'right';
                    break;
            }

            if (direct) {
                logic.move(
                    direct,
                    function (from, to, newText) {
                        view.move(from, to, newText);
                    },
                    function (score, addedScore) {
                        $('#score span').text(score);
                    });

                setTimeout(function () {
                    logic.putRandomTile(function (pos, text) {
                        view.putAt(pos, text);

                        if (logic.isGameOver()) {
                            alert("Game over!");
                        }
                    });
                }, 150);
            }
        });
    }
}