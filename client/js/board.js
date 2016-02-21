var Board = (function () {
    function Board(context) {
        this.size = 15;
        this.tileSize = 32;
        this.margin = 1;
        this.letters = [];
        this.bonus = [
            4, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 4,
            0, 1, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 1, 0, 0,
            2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
            0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0,
            0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0,
            4, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 4,
            0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0,
            0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 3, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
            2, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 2,
            0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 0, 1, 0, 0,
            0, 1, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 1, 0,
            4, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 2, 0, 0, 4
        ];
        this.played = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
        this.context = context;
        while (this.letters.length < this.size * this.size) {
            this.letters.push({ letter: '', value: 0 });
        }
        this.resetBoard();
    }
    Board.prototype.resetBoard = function () {
        for (var i = 0; i < this.size * this.size; i++) {
            this.letters[i] = { letter: '', value: 0 };
            this.played[i] = 0;
        }
    };
    Board.prototype.arrayIndexToCoor = function (index) {
        var x = 0;
        var y = 0;
        x = index % this.size;
        y = Math.floor(index / this.size);
        return { x: x, y: y };
    };
    Board.prototype.coorToIndex = function (coor) {
        return coor.y * this.size + coor.x;
    };
    Board.prototype.Draw = function () {
        this.context.fillStyle = 'rgb(200,0,0)';
        this.context.fillRect(0, 0, this.size * (this.tileSize + this.margin) + this.margin, this.size * (this.tileSize + this.margin) + this.margin);
        var squarePos = {
            x: 0,
            y: 0
        };
        var coor = {
            x: 0,
            y: 0
        };
        for (var p = 0; p < (this.size * this.size); p++) {
            coor.x = (p % this.size);
            coor.y = Math.floor(p / this.size);
            squarePos.x = coor.x * (this.tileSize + this.margin) + this.margin;
            squarePos.y = coor.y * (this.tileSize + this.margin) + this.margin;
            if (this.bonus[p] == 4)
                this.context.fillStyle = 'rgb(249, 105, 105)';
            else if (this.bonus[p] == 3)
                this.context.fillStyle = 'rgb(65, 106, 233)';
            else if (this.bonus[p] == 2)
                this.context.fillStyle = 'rgb(103, 177, 259)';
            else if (this.bonus[p] == 1)
                this.context.fillStyle = 'rgb(251, 178, 241)';
            else
                this.context.fillStyle = 'rgb(249, 238, 167)';
            this.context.fillRect(squarePos.x, squarePos.y, this.tileSize, this.tileSize);
            if (this.letters[p].letter !== '') {
                this.context.fillStyle = 'rgb(259, 248, 177)';
                this.context.fillRect(squarePos.x + 2, squarePos.y + 2, this.tileSize - 4, this.tileSize - 4);
                this.context.fillStyle = '#000';
                this.context.font = '20px Arial';
                this.context.fillText(this.letters[p].letter, squarePos.x + 9, squarePos.y + 19);
                this.context.font = '9px Arial';
                this.context.fillText(this.letters[p].value.toString(), squarePos.x + 4, squarePos.y + 28);
            }
        }
    };
    Board.prototype.PositionToCase = function (coor) {
        var x = 0;
        var y = 0;
        x = Math.floor((coor.x + this.margin) / (this.tileSize + this.margin));
        y = Math.floor((coor.y + this.margin) / (this.tileSize + this.margin));
        if (x > this.size - 1 || y > this.size - 1) {
            x = -1;
            y = -1;
        }
        return { x: x, y: y };
    };
    Board.prototype.AddToken = function (letter, coor) {
        var p = this.coorToIndex(coor);
        this.letters[p] = letter;
        this.played[p] = 1;
    };
    Board.prototype.isOnSameAxis = function (ref, toVerify) {
        return ref.x == toVerify.x || ref.y == toVerify.y;
    };
    Board.prototype.AreNewLettersInSameAxis = function () {
        var RefCoord1 = { x: -1, y: -1 };
        var RefCoord2 = { x: -1, y: -1 };
        var newToken;
        for (var i = 0; i < this.played.length; i++) {
            if (this.played[i] == 1) {
                newToken = this.arrayIndexToCoor(i);
                if (RefCoord1.x === -1) {
                    RefCoord1 = newToken;
                }
                else if (RefCoord2.x === -1) {
                    RefCoord2 = newToken;
                    if (!this.isOnSameAxis(RefCoord1, RefCoord2))
                        return false;
                }
                else {
                    if (!(this.isOnSameAxis(RefCoord1, newToken) && this.isOnSameAxis(RefCoord2, newToken)))
                        return false;
                }
            }
        }
        ;
        return !this.hasEmptySpace(RefCoord1, newToken);
    };
    Board.prototype.hasEmptySpace = function (start, end) {
        var skip;
        if (start.x == end.x) {
            skip = this.size;
        }
        else if (start.y == end.y) {
            skip = 1;
        }
        for (var i = this.coorToIndex(start); i < this.coorToIndex(end); i += skip) {
            if (this.played[i] == 0)
                return true;
        }
        return false;
    };
    return Board;
}());
