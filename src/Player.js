function Player(gameField) {

}

Player.GameField = function () {
    var Cell = Player.Cell
    var Coordinate = Player.Coordinate

    var pairs = []

    const NOT_FOUND = {cell: Cell.NONE}

    function foundPairAt(coordinate) {
        return pairs.find(function (pair) {
                return pair.coordinate.isSame(coordinate)
            }) || NOT_FOUND;
    }

    this.add = function (coordinate, cell) {
        pairs.push({coordinate: coordinate, cell: cell})
    }

    this.getCell = function (coordinate) {
        return foundPairAt(coordinate).cell
    }

    this.transform = function () {
        if (pairs.length == 0) return this

        var firstCell = this.getCell(pairs[0].coordinate)
        var middleCell = this.getCell(pairs[0].coordinate.getNextByY())
        var lastCell = this.getCell(pairs[0].coordinate.getNextByY().getNextByY());

        if (lastCell.isSame(new Cell(Cell.BLUE)) && firstCell.isSame(new Cell(Cell.BLUE)) && middleCell.isSame(new Cell(Cell.BLUE))) {
            return new Player.GameField()
        }
        return this
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

    this.getNextByX = function () {
        return new Player.Coordinate(x + 1, y)
    }

    this.getNextByY = function () {
        return new Player.Coordinate(x, y + 1)
    }
}

if (typeof module != "undefined") {
    module.exports = Player
}