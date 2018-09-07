// 248 Game - JavaScript, Jquery 
// Write by Trac Quang Hoa, 2018

function GameView(xDim, yDim, tileSize, padding, animationSpeed) {
    var size = tileSize + padding;
    var board;

    /**
     * Initialize a game board in the given container
     * @param {*} container 
     */
    this.init = function (container) {

        // Create a game-board div that will contains all the tiles
        board = $('<div></div>')
            .addClass('game-board')
            .css({
                width: (size * xDim + padding) + 'px',
                height: (size * yDim + padding) + 'px'
            })
            .appendTo(container);

        // Create backgound tiles
        for (let i = 0; i < xDim; i++) {
            for (let j = 0; j < yDim; j++) {
                board.append(createTile({ x: i, y: j }));
            }
        }
    }

    /**
     * Clear the game board.
     * After this function the game board is reset to the initialization state
     */
    this.clear = function () {

        // Remove all tiles that is created when playing
        board.find('.play-tile').remove();
        $('#popup').remove();
    }

    /**
     * Put a title with specified text at a specified position
     * @param {*} pos 
     * @param {*} text 
     */
    this.putAt = function (pos, value) {

        // Creates a hidden tile then shows it with fade-in animation
        createTile(pos, 'play-tile ' + createPosClass(pos), value, true)
            .appendTo(board)
            .fadeIn(animationSpeed);
    }

    /**
     * Move a tile from posFrom to posTo and set a new value to it if specifed.
     * If there is another tile at posTo then this tile will be removed first.
     * 
     * @param {*} posFrom 
     * @param {*} posTo 
     * @param {*} newValue optional
     */
    this.move = function (posFrom, posTo, newValue) {
        var fromClass = createPosClass(posFrom);
        var toClass = createPosClass(posTo);

        // If source position and destination position are different
        if (posFrom.x != posTo.x || posFrom.y != posTo.y) {

            var fromTile = board.find('.' + fromClass);
            var toTile = board.find('.' + toClass);

            // There is a tile at the same position as the destinaton then removes it first with animation
            toTile.fadeOut(animationSpeed, function () {
                this.remove();
            });

            // Move the tile from posFrom to posTo with animation
            var tile = fromTile
                .animate({
                    left: (padding + posTo.x * size) + 'px',
                    top: (padding + posTo.y * size) + 'px'
                }, animationSpeed)
                .removeClass(fromClass)
                .addClass(toClass);
        } else {
            var tile = board.find('.' + toClass);
        }

        // A new value need to be applied to the destination tile
        if (newValue) {
            tile.queue(function () {
                tile.text(newValue)
                    .removeClass('v' + (newValue / 2))
                    .addClass('v' + newValue)
                    .dequeue();
            });
        }
    }

    this.gameOver = function () {
        $('<div>Game Over!</div>').attr('id', 'popup').css({
            'margin-top': '-' + board.css('height'),
            width: board.css('width'),
            height: board.css('height'),
            'line-height': board.css('height'),
            opacity: 0.5,
        }).insertAfter(board);
    }

    /**
     * Create a class that contains position of a tile
     * @param {*} pos 
     */
    function createPosClass(pos) {
        return pos.x + '_' + pos.y;
    }

    /**
     * Create a new tile with given properties
     * @param {*} pos 
     * @param {*} clazz optional
     * @param {*} value optional
     * @param {*} hide optional
     */
    function createTile(pos, clazz, value, hide) {
        var tile = $('<div></div>').css({
            left: (padding + pos.x * size) + 'px',
            top: (padding + pos.y * size) + 'px',
            width: tileSize + 'px',
            height: tileSize + 'px',
            'line-height': tileSize + 'px'
        });

        if (clazz) {
            tile.addClass(clazz)
        }

        if (value) {
            tile.text(value).addClass('v' + value);
        }

        if (hide) {
            tile.css('display', 'none');
        }

        return tile;
    }
}