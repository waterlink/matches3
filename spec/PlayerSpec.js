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

    it("handles missing cell gracefully", function () {
        var cell = gameField.getCell(new Coordinate(0, 0))
        expect(cell.isSame(Cell.NONE)).toEqual(true)
    })

    context("when there are 2 different cells", function () {
        beforeEach(function () {
            gameField.add(new Coordinate(0, 0), new Cell(Cell.BLUE))
            gameField.add(new Coordinate(0, 1), new Cell(Cell.RED))
        })

        it("allows to fetch first added cell", function () {
            var cell = gameField.getCell(new Coordinate(0, 0))
            expect(cell.isSame(new Cell(Cell.BLUE))).toEqual(true)
        })

        it("allows to fetch second added cell", function () {
            var cell = gameField.getCell(new Coordinate(0, 1))
            expect(cell.isSame(new Cell(Cell.RED))).toEqual(true)
        })
    })

    context("when nothing can be match3-ed", function () {
        beforeEach(function () {
            gameField.add(new Coordinate(0, 0), new Cell(Cell.BLUE))
            gameField.add(new Coordinate(0, 1), new Cell(Cell.RED))
        })

        it("stays same", function () {
            var nextGameField = gameField.transform()

            var firstCell = nextGameField.getCell(new Coordinate(0, 0))
            var secondCell = nextGameField.getCell(new Coordinate(0, 1))

            expect(firstCell.isSame(new Cell(Cell.BLUE))).toEqual(true)
            expect(secondCell.isSame(new Cell(Cell.RED))).toEqual(true)
        })
    })

    context("when something can be matched vertically", function () {
        beforeEach(function () {
            gameField.add(new Coordinate(0, 0), new Cell(Cell.BLUE))
            gameField.add(new Coordinate(0, 1), new Cell(Cell.BLUE))
            gameField.add(new Coordinate(0, 2), new Cell(Cell.BLUE))
        })

        it("gets matched and destroyed", function () {
            var nextGameField = gameField.transform()

            var firstCell = nextGameField.getCell(new Coordinate(0, 0))
            var secondCell = nextGameField.getCell(new Coordinate(0, 1))
            var thirdCell = nextGameField.getCell(new Coordinate(0, 2))

            expect(firstCell.isSame(Cell.NONE)).toEqual(true)
        })
    })

    xcontext("when something can be matched vertically somewhere else", function () {
        beforeEach(function () {
            gameField.add(new Coordinate(5, 0), new Cell(Cell.BLUE))
            gameField.add(new Coordinate(5, 1), new Cell(Cell.BLUE))
            gameField.add(new Coordinate(5, 2), new Cell(Cell.BLUE))
        })

        it("gets matched and destroyed", function () {
            var nextGameField = gameField.transform()

            var firstCell = nextGameField.getCell(new Coordinate(5, 0))
            var secondCell = nextGameField.getCell(new Coordinate(5, 1))
            var thirdCell = nextGameField.getCell(new Coordinate(5, 2))

            expect(firstCell.isSame(Cell.NONE)).toEqual(true)
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

    describe(".getNextByX()", function () {
        it("can be used to fetch next x coordinate", function () {
            var coordinate = new Coordinate(3, 4)
            var expectedNextXCoordinate = new Coordinate(4, 4)
            var nextXCoordinate = coordinate.getNextByX()

            expect(nextXCoordinate.isSame(expectedNextXCoordinate)).toEqual(true)
        })

        it("can be used to fetch different next x coordinate", function () {
            var coordinate = new Coordinate(75, 4)
            var expectedNextXCoordinate = new Coordinate(76, 4)
            var nextXCoordinate = coordinate.getNextByX()

            expect(nextXCoordinate.isSame(expectedNextXCoordinate)).toEqual(true)
        })

        it("can be used to fetch next x coordinate with different y", function () {
            var coordinate = new Coordinate(3, 42)
            var expectedNextXCoordinate = new Coordinate(4, 42)
            var nextXCoordinate = coordinate.getNextByX()

            expect(nextXCoordinate.isSame(expectedNextXCoordinate)).toEqual(true)
        })
    })

    describe(".getNextByY", function () {
        it("can be used to fetch next y coordinate", function () {
            var coordinate = new Coordinate(3, 4)
            var expectedNextYCoordinate = new Coordinate(3, 5)
            var nextYCoordinate = coordinate.getNextByY()

            expect(nextYCoordinate.isSame(expectedNextYCoordinate)).toEqual(true)
        })

        it("can be used to fetch different next y coordinate", function () {
            var coordinate = new Coordinate(3, 45)
            var expectedNextYCoordinate = new Coordinate(3, 46)
            var nextYCoordinate = coordinate.getNextByY()

            expect(nextYCoordinate.isSame(expectedNextYCoordinate)).toEqual(true)
        })

        it("can be used to fetch next y coordinate with different x", function () {
            var coordinate = new Coordinate(88, 4)
            var expectedNextYCoordinate = new Coordinate(88, 5)
            var nextYCoordinate = coordinate.getNextByY()

            expect(nextYCoordinate.isSame(expectedNextYCoordinate)).toEqual(true)
        })
    })
})