const Player = require("../src/Player")
const GameField = Player.GameField
const Cell = Player.Cell
const Coordinate = Player.Coordinate

describe("Player", function () {
    it("can be created with game field", function () {
        var gameField = new GameField()
        var player = new Player(gameField)
    })
})

describe("GameField", function () {
    var gameField

    beforeEach(function () {
        gameField = new GameField()
    })

    it("can have cells", function () {
        gameField.add(new Coordinate(0, 0), new Cell(Cell.RED))

        var cell = gameField.getCell(new Coordinate(0, 0))
        expect(cell.isSame(new Cell(Cell.RED))).toEqual(true)
    })

    it("allows to fetch added cell", function () {
        gameField.add(new Coordinate(0, 0), new Cell(Cell.BLUE))

        var cell = gameField.getCell(new Coordinate(0, 0))
        expect(cell.isSame(new Cell(Cell.BLUE))).toEqual(true)
    })

    context("when there are 2 different cells", function () {
        beforeEach(function () {
            gameField.add(new Coordinate(0, 0), new Cell(Cell.BLUE))
            gameField.add(new Coordinate(0, 1), new Cell(Cell.RED))
        })

        it("allows to fetch added cell with different coordinate", function () {
            var cell = gameField.getCell(new Coordinate(0, 0))
            expect(cell.isSame(new Cell(Cell.BLUE))).toEqual(true)
        })
    })
})

describe("Cell", function () {
    it("can be of the same color as other cell", function () {
        var cell = new Cell(Cell.RED)
        var otherCell = new Cell(Cell.RED)

        expect(cell.isSame(otherCell)).toEqual(true)
    })

    it("can be of different color from other cell", function () {
        var cell = new Cell(Cell.RED)
        var otherCell = new Cell(Cell.BLUE)

        expect(cell.isSame(otherCell)).toEqual(false)
    })
})

describe("Coordinate", function () {
    it("can be created with 2 numbers", function () {
        var coordinate = new Coordinate(3, 4)
    })

    it("can be the same as other cell", function () {
        var coordinate = new Coordinate(3, 4)
        var otherCoordinate = new Coordinate(3, 4)

        expect(coordinate.isSame(otherCoordinate)).toEqual(true)
    })

    it("can not be the same as other cell with different x", function () {
        var coordinate = new Coordinate(3, 4)
        var otherCoordinate = new Coordinate(4, 4)

        expect(coordinate.isSame(otherCoordinate)).toEqual(false)
    })

    it("can not be the same as other cell with different y", function () {
        var coordinate = new Coordinate(3, 4)
        var otherCoordinate = new Coordinate(3, 5)

        expect(coordinate.isSame(otherCoordinate)).toEqual(false)
    })
})