function boardView() {

    var tile_size = 30,
        size = 15,
        margin = 2,
        grid_offset = 8 + margin;

    function render(context) {

        context.fillStyle = 'rgb(200,0,0)';

        context.fillRect(
            8,
            8,
            size * (tile_size + margin) + margin,
            size * (tile_size + margin) + margin
        );

        var squarePos = {
            x: 0,
            y: 0
        };
        var coor = {
            x: 0,
            y: 0
        };

        var valuesMul = boardModel().valuesMul;

        for (var p = 0; p < (size * size); p++) {

            coor.x = (p % size);
            coor.y = Math.floor(p / size);

            squarePos.x = grid_offset + coor.x * (tile_size + margin);
            squarePos.y = grid_offset + coor.y * (tile_size + margin);

            // Draw Grid
            if (valuesMul[p] == 4)
                context.fillStyle = 'rgb(249, 105, 105)';
            else if (valuesMul[p] == 3)
                context.fillStyle = 'rgb(65, 106, 233)';
            else if (valuesMul[p] == 2)
                context.fillStyle = 'rgb(103, 177, 259)';
            else if (valuesMul[p] == 1)
                context.fillStyle = 'rgb(251, 178, 241)';
            else
                context.fillStyle = 'rgb(249, 238, 167)';

            context.globalAlpha = 0.8;

            context.fillRect(
                squarePos.x,
                squarePos.y,
                tile_size,
                tile_size
            );

            // Draw Letters
            context.globalAlpha = 1;

            context.fillStyle = 'rgb(10, 10, 10)';

            context.font = "18px Arial";
            context.fillText(
                'B',
                squarePos.x + 9,
                squarePos.y + 21
            );

            // Draw Values
            context.font = "9px Arial";
            context.fillText(
                '3',
                squarePos.x + 2,
                squarePos.y + tile_size - 2
            );

        }
    }

    return {
        render: render
    };
}
