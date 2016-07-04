function Player(gameField) {
    this.makeTurn = function (turn) {
        
    }
}

Player.GameField = function () {
    var Cell = Player.Cell
    var Coordinate = Player.Coordinate
    var that = this

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

    function cellIsMatchingBy(by, coordinate) {
        var cell = that.getCell(coordinate)
        var matching = false

        var cells = [
            that.getCell(coordinate.getPrev(by).getPrev(by)),
            that.getCell(coordinate.getPrev(by)),
            cell,
            that.getCell(coordinate.getNext(by)),
            that.getCell(coordinate.getNext(by).getNext(by))
        ]

        for (var i = 0; i < 3; i++) {
            if (cells[i + 1].isSame(cells[i]) && cells[i + 2].isSame(cells[i])) {
                matching = true
            }
        }

        return matching
    }

    function cellIsMatching(coordinate) {
        return cellIsMatchingBy(Coordinate.ByY, coordinate) ||
            cellIsMatchingBy(Coordinate.ByX, coordinate);
    }

    this.transform = function () {
        if (pairs.length == 0) return this

        var gameField = new Player.GameField();

        for (var index = 0; index < pairs.length; index++) {
            var coordinate = pairs[index].coordinate

            if (!cellIsMatching(coordinate)) {
                gameField.add(coordinate, that.getCell(coordinate))
            }
        }
        
        return gameField
    }
}

Player.Cell = function (color) {
    this._color = color

    this.isSame = function (other) {
        return color == other._color
    }

    this.toString = function () {
        return "Cell(" + color + ")"
    }
}

var NoCell = function () {
    this._color = "NONE"

    this.isSame = function (other) {
        return Player.Cell.NONE === other
    }

    this.toString = function () {
        return "Cell.NONE"
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

    this.getNext = function (by) {
        return by.incrementBy(x, y, 1)
    }

    this.getPrev = function (by) {
        return by.incrementBy(x, y, -1)
    }
}

Player.Coordinate.ByX = {
    incrementBy: function (x, y, value) {
        return new Player.Coordinate(x + value, y)
    }
}

Player.Coordinate.ByY = {
    incrementBy: function (x, y, value) {
        return new Player.Coordinate(x, y + value)
    }
}

if (typeof module != "undefined") {
    module.exports = Player
}