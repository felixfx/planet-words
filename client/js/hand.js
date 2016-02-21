var Hand = (function () {
    function Hand(context, coor) {
        this.size = 7;
        this.tokens = [];
        for (var i = 0; i < this.size; i++) {
            this.tokens.push({ letter: '', value: 0 });
        }
        this.coor = coor;
    }
    Hand.prototype.draw = function () {
    };
    return Hand;
}());
