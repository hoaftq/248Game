// 248 Game - JavaScript, Jquery 
// Write by Trac Quang Hoa, 2018

const X_SIZE = 4;
const Y_SIZE = 4;

function GameController() {

    this.newGame = function () {
        var logic = new GameLogic(X_SIZE, Y_SIZE);
        var view = new GameView(X_SIZE, Y_SIZE, 80, 10, 500);

        logic.initGameBoard();
        view.init('#container');

        for (let i = 0; i < 2; i++) {
            logic.putRandomTile(function (pos, text) {
                view.putAt(pos, text);
            });
        }

        $(document).keydown(function (e) {
            switch (e.key) {
                case 'ArrowUp':
                    logic.moveUp(function (from, to, newText) {
                        view.move(from, to, newText);
                    });
                    break;

                case 'ArrowDown':
                    logic.moveDown(function (from, to, newText) {
                        view.move(from, to, newText);
                    });
                    break;

                case 'ArrowLeft':
                    logic.moveLeft(function (from, to, newText) {
                        view.move(from, to, newText);
                    });
                    break;

                case 'ArrowRight':
                    logic.moveRight(function (from, to, newText) {
                        view.move(from, to, newText);
                    });
                    break;
            }

            setTimeout(function () {
                logic.putRandomTile(function (pos, text) {
                    view.putAt(pos, text);
                });
            }, 1000);

        });
    }
}