function Player(gameField) {

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

    function cellIsMatching(coordinate) {
        var cell = that.getCell(coordinate)
        var matching = false

        var cells = [
            that.getCell(coordinate.getPrevByY().getPrevByY()),
            that.getCell(coordinate.getPrevByY()),
            cell,
            that.getCell(coordinate.getNextByY()),
            that.getCell(coordinate.getNextByY().getNextByY())
        ]

        for (var i = 0; i < 3; i++) {
            if (cells[i + 1].isSame(cells[i]) && cells[i + 2].isSame(cells[i])) {
                matching = true
            }
        }

        return matching
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

    this.getNextByX = function () {
        return new Player.Coordinate(x + 1, y)
    }

    this.getPrevByX = function () {
        return new Player.Coordinate(x - 1, y)
    }

    this.getNextByY = function () {
        return new Player.Coordinate(x, y + 1)
    }

    this.getPrevByY = function () {
        return new Player.Coordinate(x, y - 1)
    }
}

if (typeof module != "undefined") {
    module.exports = Player
}