/// <reference path="./board.ts"/>

class Game {

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private board: Board;

    constructor(surfaceId: string) {

        this.canvas = <HTMLCanvasElement>document.getElementById(surfaceId);

        this.context = this.canvas.getContext('2d');

        this.board = new Board(this.context);

        this.board.Draw();
    }

    public Events() {

        this.canvas.onmouseup = e => {
            var pos = this.board.PositionToCase({ x: e.layerX, y: e.layerY });

            this.board.AddToken(
                {
                    letter: (<HTMLInputElement>document.getElementById('letter')).value.toUpperCase() || ' ',
                    value: parseInt((<HTMLInputElement>document.getElementById('value')).value) || 0
                },
                {x: pos.x, y: pos.y});

            this.board.Draw();

            console.log(pos);
        };

        // Play a turn
        document.getElementById('btn-end-turn').onclick = e => {

            alert(this.board.AreNewLettersInSameAxis());

        };

    }


}
