function Player(gameField) {

}

Player.GameField = function () {
    var Cell = Player.Cell

    var cells = []

    this.add = function (coordinate, cell) {
        cells.push([coordinate, cell])
    }

    this.getCell = function (coordinate) {
        return (cells.find(function (pair) {
            return pair[0].isSame(coordinate)
        }) || [null, Cell.NONE])[1]
    }
}

Player.Cell = function (color) {
    this._color = color

    this.isSame = function (other) {
        return color == other._color
    }
}

var NoCell = function () {
    this.isSame = function (other) {
        return Player.Cell.NONE === other
    }
}

Player.Cell.RED = "red"
Player.Cell.BLUE = "blue"
Player.Cell.NONE = new NoCell()

Player.Coordinate = function (x, y) {
    this._x = x
    this._y = y

    this.isSame = function (other) {
        return x == other._x && y == other._y
    }
}

if (typeof module != "undefined") {
    module.exports = Player
}