function Player(gameField) {

}

Player.GameField = function () {
    var Cell = Player.Cell

    this.add = function (coordinate, cell) {

    }

    this.getCell = function (coordinate) {
        return new Cell(Cell.RED)
    }
}

Player.Cell = function (color) {
    this._color = color

    this.isSame = function (other) {
        return color == other._color
    }
}

Player.Cell.RED = "red"
Player.Cell.BLUE = "blue"

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