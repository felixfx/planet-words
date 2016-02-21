var Game = (function () {
    function Game(surfaceId) {
        this.canvas = document.getElementById(surfaceId);
        this.context = this.canvas.getContext('2d');
        this.board = new Board(this.context);
        this.board.Draw();
    }
    Game.prototype.Events = function () {
        var _this = this;
        this.canvas.onmouseup = function (e) {
            var pos = _this.board.PositionToCase({ x: e.layerX, y: e.layerY });
            _this.board.AddToken({
                letter: document.getElementById('letter').value.toUpperCase() || ' ',
                value: parseInt(document.getElementById('value').value) || 0
            }, { x: pos.x, y: pos.y });
            _this.board.Draw();
            console.log(pos);
        };
        document.getElementById('btn-end-turn').onclick = function (e) {
            alert(_this.board.AreNewLettersInSameAxis());
        };
    };
    return Game;
}());
