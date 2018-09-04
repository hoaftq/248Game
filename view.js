// 248 Game - JavaScript, Jquery 
// Write by Trac Quang Hoa, 2018

function GameView(xDim, yDim, tileSize, padding, animationSpeed) {
    var size = tileSize + padding;
    var board;

    this.init = function (container) {
        board = $('<div></div>')
            .addClass('game-board')
            .css({
                width: (size * xDim + padding) + 'px',
                height: (size * yDim + padding) + 'px'
            })
            .appendTo(container);

        for (let i = 0; i < xDim; i++) {
            for (let j = 0; j < yDim; j++) {
                board.append(createTile({ x: i, y: j }, 'background-tile'));
            }
        }

    }

    /**
     * Put a title with specified text at a specified position
     * @param {*} pos 
     * @param {*} text 
     */
    this.putAt = function (pos, text) {
        createTile(pos, pos.x + '_' + pos.y, text, true).appendTo(board).fadeIn(animationSpeed);
    }

    /**
     * Move a tile from posFrom to posTo and set a new text to it if specifed.
     * If there is another tile at posTo then this title will be removed first.
     * 
     * @param {*} posFrom 
     * @param {*} posTo 
     * @param {*} newText 
     */
    this.move = function (posFrom, posTo, newText) {

        console.log(posFrom);
        console.log(posTo);
        console.log(newText);

        // If source position and destination position are different
        if (posFrom.x != posTo.x || posFrom.y != posTo.y) {

            var fromClass = makePosClass(posFrom);
            var toClass = makePosClass(posTo);

            var fromTile = board
                .find('.' + fromClass);
            var toTile = board.find('.' + toClass);

            // There is a tile at the same position as the destinaton then remove it first
            toTile.fadeOut(animationSpeed, function () {
                this.remove();
            });

            // Move the tile from posFrom to posTo with animation
            var tile = fromTile
                .animate(getPosObj(posTo), animationSpeed)
                .removeClass(fromClass)
                .addClass(toClass);
        } else {
            var toClass = makePosClass(posTo);
            var tile = board.find('.' + toClass);
        }

        // A new value need to be applied to the destination tile
        if (newText) {
            tile.queue(function () {
                tile.text(newText).dequeue();
            });
        }
    }

    function makePosClass(pos) {
        return pos.x + '_' + pos.y;
    }

    function getPosObj(pos) {
        return {
            left: (padding + pos.x * size) + 'px',
            top: (padding + pos.y * size) + 'px'
        }
    }

    function createTile(pos, clazz, text, hide) {
        var tile = $('<div></div>')
            .css({
                left: (padding + pos.x * size) + 'px',
                top: (padding + pos.y * size) + 'px',
                width: tileSize + 'px',
                height: tileSize + 'px',
                'line-height': tileSize + 'px'
            })
            .addClass(clazz);

        if (text) {
            tile.text(text);
        }

        if (hide) {
            tile.css('display', 'none');
        }

        return tile;
    }
}