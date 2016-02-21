/// <reference path="./interfaces.ts"/>


class Board {

    private size: number = 15;

    // tileSize: Size (in pixels) of a tile
    private tileSize: number = 32;

    // margin: Margin (in pixels) between each tiles
    private margin: number = 1;

    private context: CanvasRenderingContext2D;

    private letters: Array<Token> = [];

    /// bonus:
    /// 0 = Nothing
    /// 1 = letter x2
    /// 2 = letter x3
    /// 3 = word x2
    /// 4 = word x3
    private bonus: Array<number> = [
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

    /// played :
    /// 0 = Nothing yet
    /// 1 = Played on the current turn
    /// 2 = Played before the current turn
    private played: Array<number> = [
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


    constructor(context: CanvasRenderingContext2D) {

        this.context = context;

        // Fill with empty tiles
        while (this.letters.length < this.size * this.size) {
            this.letters.push({ letter: '', value: 0 });
        }

        this.resetBoard();
    }

    // Reset the whole board
    private resetBoard() {

        // Reset all the values
        for (let i = 0; i < this.size * this.size; i++) {

            // Reset the letters
            this.letters[i] = { letter: '', value: 0 };

            // Reset the played tokens
            this.played[i] = 0;

        }
    }

    private arrayIndexToCoor(index: number): Coordinate {

        var x: number = 0;
        var y: number = 0;

        x = index % this.size;
        y = Math.floor(index / this.size);

        return { x: x, y: y };

    }

    private coorToIndex(coor: Coordinate): number {

        return coor.y * this.size + coor.x;

    }

    // Draw the board
    public Draw() {

        this.context.fillStyle = 'rgb(200,0,0)';

        this.context.fillRect(
            0, 0,
            this.size * (this.tileSize + this.margin) + this.margin,
            this.size * (this.tileSize + this.margin) + this.margin
            );

        var squarePos: Coordinate = {
            x: 0,
            y: 0
        };

        var coor: Coordinate = {
            x: 0,
            y: 0
        };

        for (var p = 0; p < (this.size * this.size); p++) {

            coor.x = (p % this.size);
            coor.y = Math.floor(p / this.size);

            squarePos.x = coor.x * (this.tileSize + this.margin) + this.margin;
            squarePos.y = coor.y * (this.tileSize + this.margin) + this.margin;

            // Draw Grid
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

            this.context.fillRect(
                squarePos.x,
                squarePos.y,
                this.tileSize,
                this.tileSize
                );

            // If there is a letter to draw
            if (this.letters[p].letter !== '') {
                this.context.fillStyle = 'rgb(259, 248, 177)';

                this.context.fillRect(
                    squarePos.x + 2,
                    squarePos.y + 2,
                    this.tileSize - 4,
                    this.tileSize - 4
                    );

                this.context.fillStyle = '#000';
                this.context.font = '20px Arial';

                this.context.fillText(
                    this.letters[p].letter,
                    squarePos.x + 9,
                    squarePos.y + 19
                    );

                this.context.font = '9px Arial';
                this.context.fillText(
                    this.letters[p].value.toString(),
                    squarePos.x + 4,
                    squarePos.y + 28
                    );
            }

        }
    }

    // Convert the pixels-coordinate to tile position
    public PositionToCase(coor: Coordinate): Coordinate {

        var x: number = 0;
        var y: number = 0;

        x = Math.floor(
            (coor.x + this.margin) / (this.tileSize + this.margin)
            );

        y = Math.floor(
            (coor.y + this.margin) / (this.tileSize + this.margin)
            );

        // Everything bigger than the playground is -1
        if (x > this.size - 1 || y > this.size - 1) {
            x = -1;
            y = -1;
        }

        return <Coordinate>{ x, y };
    }

    // Add a token to the board
    public AddToken(letter: Token, coor: Coordinate) {

        var p = this.coorToIndex(coor);

        this.letters[p] = letter;
        this.played[p] = 1;
    }

    private isOnSameAxis(ref: Coordinate, toVerify: Coordinate): boolean {

        return ref.x == toVerify.x || ref.y == toVerify.y;

    }

    // Verify if all the new letter are constrained by one axis
    public AreNewLettersInSameAxis(): boolean {

        var RefCoord1: Coordinate = { x: -1, y: -1 };
        var RefCoord2: Coordinate = { x: -1, y: -1 };
        var newToken: Coordinate;

        for (let i = 0; i < this.played.length; i++) {

            // Newly played
            if (this.played[i] == 1) {

                newToken = this.arrayIndexToCoor(i);

                // First time it founds a newly played
                if (RefCoord1.x === -1) {
                    RefCoord1 = newToken;
                }
                else if (RefCoord2.x === -1) { // The second point
                    RefCoord2 = newToken;

                    if (!this.isOnSameAxis(RefCoord1, RefCoord2)) // They are not aligned !
                        return false;

                } else { // Every other times

                    // Is not on the axis of the two references
                    if (!(this.isOnSameAxis(RefCoord1, newToken) && this.isOnSameAxis(RefCoord2, newToken)))
                        return false;

                }
            }

        };

        // The axis are good, now we want to know if we have
        return !this.hasEmptySpace(RefCoord1, newToken);

    }

    private hasEmptySpace(start: Coordinate, end: Coordinate): boolean {

        var skip: number;

        if (start.x == end.x) { // It's going along the Y axis
            skip = this.size;
        } else if (start.y == end.y) { // It's going along the X axis
            skip = 1;
        }

        for (let i = this.coorToIndex(start); i < this.coorToIndex(end); i += skip) {

            if (this.played[i] == 0) // An empty tile !
                return true;
        }

        // We got nothing... It's all fine
        return false;
    }

}
