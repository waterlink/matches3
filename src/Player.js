function Player(gameField) {

}

Player.GameField = function () {

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
    this.isSame = function (other) {
        return true
    }
}

if (typeof module != "undefined") {
    module.exports = Player
}