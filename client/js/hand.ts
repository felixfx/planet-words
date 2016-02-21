/// <reference path="./interfaces.ts"/>


class Hand {

    private size: number = 7;
    private tokens: Array<Token> = [];

    private coor: Coordinate;

    constructor (context: CanvasRenderingContext2D, coor: Coordinate) {

        for (var i = 0; i < this.size; i++) {
            this.tokens.push({letter: '', value: 0});
        }

        this.coor = coor;

    }

    draw () {

    }

}
