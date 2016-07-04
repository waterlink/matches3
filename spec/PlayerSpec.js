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

    function setupGameField(offsetX, offsetY, field) {
        const colors = {"R": Cell.RED, "B": Cell.BLUE}

        for (var y = 0; y < field.length; y++) {
            for (var x = 0; x < field[0].length; x++) {
                var cellRepr = field[y][x]
                var coordinate = new Coordinate(offsetX + x, offsetY + y)
                var cell

                if (cellRepr == ".") {
                    cell = Cell.NONE
                } else {
                    cell = new Cell(colors[cellRepr])
                }

                gameField.add(coordinate, cell)
            }
        }
    }

    function cellAt(x, y) {
        return gameField.getCell(new Coordinate(x, y));
    }

    var customMatchers = {
        toBeMissing: function (utils, customEqualityTesters) {
            return {
                compare: function (actual, expected) {
                    var result = {}

                    result.pass = utils.equals(actual.isSame(Cell.NONE), true)

                    if (result.pass) {
                        result.message = "Expected " + actual + " to be present"
                    } else {
                        result.message = "Expected " + actual + " to be missing"
                    }

                    return result
                }
            }
        },

        toBeOfColor: function (utils, customEqualityTesters) {
            return {
                compare: function (actual, expectedColor) {
                    var result = {}

                    var expected = new Cell(expectedColor);
                    result.pass = utils.equals(actual.isSame(expected), true)

                    if (result.pass) {
                        result.message = "Expected " + actual + " not to be of color " + expectedColor
                    } else {
                        result.message = "Expected " + actual + " to be of color " + expectedColor
                    }

                    return result
                }
            }
        }
    }

    beforeEach(function () {
        jasmine.addMatchers(customMatchers)
    })

    it("can have cells", function () {
        gameField.add(new Coordinate(0, 0), new Cell(Cell.RED))

        expect(cellAt(0, 0)).toBeOfColor(Cell.RED)
    })

    it("allows to fetch added cell", function () {
        gameField.add(new Coordinate(0, 0), new Cell(Cell.BLUE))

        expect(cellAt(0, 0)).toBeOfColor(Cell.BLUE)
    })

    it("handles missing cell gracefully", function () {
        expect(cellAt(0, 0)).toBeMissing()
    })

    context("when there are 2 different cells", function () {
        beforeEach(function () {
            setupGameField(0, 0, [
                "B",
                "R"
            ])
        })

        it("allows to fetch first added cell", function () {
            expect(cellAt(0, 0)).toBeOfColor(Cell.BLUE)
        })

        it("allows to fetch second added cell", function () {
            expect(cellAt(0, 1)).toBeOfColor(Cell.RED)
        })
    })

    context("when nothing can be match3-ed", function () {
        beforeEach(function () {
            setupGameField(0, 0, [
                "B",
                "R"
            ])
        })

        it("stays same", function () {
            gameField = gameField.transform()

            expect(cellAt(0, 0)).toBeOfColor(Cell.BLUE)
            expect(cellAt(0, 1)).toBeOfColor(Cell.RED)
        })
    })

    context("when something can be matched vertically", function () {
        beforeEach(function () {
            setupGameField(0, 0, [
                "B",
                "B",
                "B"
            ])
        })

        it("gets matched and destroyed", function () {
            gameField = gameField.transform()

            expect(cellAt(0, 0)).toBeMissing()
            expect(cellAt(0, 1)).toBeMissing()
            expect(cellAt(0, 2)).toBeMissing()
        })
    })

    context("when something can be matched vertically somewhere else", function () {
        beforeEach(function () {
            setupGameField(5, 0, [
                "B",
                "B",
                "B"
            ])
        })

        it("gets matched and destroyed", function () {
            gameField = gameField.transform()

            expect(cellAt(5, 0)).toBeMissing()
            expect(cellAt(5, 1)).toBeMissing()
            expect(cellAt(5, 2)).toBeMissing()
        })
    })

    context("when column has different top color", function () {
        beforeEach(function () {
            setupGameField(5, 0, [
                "R",
                "B",
                "B"
            ])
        })

        it("is not matched", function () {
            gameField = gameField.transform()

            expect(cellAt(5, 0)).not.toBeMissing()
            expect(cellAt(5, 1)).not.toBeMissing()
            expect(cellAt(5, 2)).not.toBeMissing()
        })
    })

    context("when column has different middle color", function () {
        beforeEach(function () {
            setupGameField(5, 0, [
                "B",
                "R",
                "B"
            ])
        })

        it("is not matched", function () {
            gameField = gameField.transform()

            expect(cellAt(5, 0)).not.toBeMissing()
            expect(cellAt(5, 1)).not.toBeMissing()
            expect(cellAt(5, 2)).not.toBeMissing()
        })
    })

    context("when column has different last color", function () {
        beforeEach(function () {
            setupGameField(5, 0, [
                "B",
                "B",
                "R"
            ])
        })

        it("is not matched", function () {
            gameField = gameField.transform()

            expect(cellAt(5, 0)).not.toBeMissing()
            expect(cellAt(5, 1)).not.toBeMissing()
            expect(cellAt(5, 2)).not.toBeMissing()
        })
    })

    context("when column is of different color", function () {
        beforeEach(function () {
            setupGameField(5, 0, [
                "R",
                "R",
                "R"
            ])
        })

        it("is matched and destroyed", function () {
            gameField = gameField.transform()

            expect(cellAt(5, 0)).toBeMissing()
            expect(cellAt(5, 1)).toBeMissing()
            expect(cellAt(5, 2)).toBeMissing()
        })
    })

    context("when there are more cells, than just matching column", function () {
        beforeEach(function () {
            setupGameField(5, 0, [
                "RR",
                "RB",
                "RB"
            ])
        })

        it("is matched and destroyed", function () {
            gameField = gameField.transform()

            expect(cellAt(6, 0)).not.toBeMissing()
            expect(cellAt(6, 1)).not.toBeMissing()
            expect(cellAt(6, 2)).not.toBeMissing()
        })
    })

})

describe("Cell", function () {
    var cell = new Cell(Cell.RED)

    it("can be of the same color as other cell", function () {
        var otherCell = new Cell(Cell.RED)

        expect(cell.isSame(otherCell)).toEqual(true)
    })

    it("can be of different color from other cell", function () {
        var otherCell = new Cell(Cell.BLUE)

        expect(cell.isSame(otherCell)).toEqual(false)
    })

    it("can not be equal to NONE even when color is undefined", function () {
        var cellWithoutColor = new Cell(undefined)

        expect(cellWithoutColor.isSame(Cell.NONE)).toEqual(false)
    })

    it("has nice string representation", function () {
        expect("hello, I am " + cell).toEqual("hello, I am Cell(red)")
    })

    describe("NONE", function () {
        it("has nice string representation", function () {
            expect("hello, I am " + Cell.NONE).toEqual("hello, I am Cell.NONE")
        })
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

    describe(".getPrevByX", function () {
        it("can be used to fetch previous x coordinate", function () {
            var coordinate = new Coordinate(3, 4)
            var expectedPrevXCoordinate = new Coordinate(2, 4)
            var prevXCoordinate = coordinate.getPrevByX()

            expect(prevXCoordinate.isSame(expectedPrevXCoordinate)).toEqual(true)
        })

        it("can be used to fetch different previous x coordinate", function () {
            var coordinate = new Coordinate(33, 4)
            var expectedPrevXCoordinate = new Coordinate(32, 4)
            var prevXCoordinate = coordinate.getPrevByX()

            expect(prevXCoordinate.isSame(expectedPrevXCoordinate)).toEqual(true)
        })

        it("can be used to fetch previous x coordinate with different y", function () {
            var coordinate = new Coordinate(3, 45)
            var expectedPrevXCoordinate = new Coordinate(2, 45)
            var prevXCoordinate = coordinate.getPrevByX()

            expect(prevXCoordinate.isSame(expectedPrevXCoordinate)).toEqual(true)
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

    describe("getPrevByY", function () {
        it("can be used to fetch previous y coordinate", function () {
            var coordinate = new Coordinate(3, 4)
            var expectedPrevYCoordinate = new Coordinate(3, 3)
            var prevYCoordinate = coordinate.getPrevByY()

            expect(prevYCoordinate.isSame(expectedPrevYCoordinate)).toEqual(true)
        })

        it("can be used to fetch different previous y coordinate", function () {
            var coordinate = new Coordinate(3, 42)
            var expectedPrevYCoordinate = new Coordinate(3, 41)
            var prevYCoordinate = coordinate.getPrevByY()

            expect(prevYCoordinate.isSame(expectedPrevYCoordinate)).toEqual(true)
        })

        it("can be used to fetch previous y coordinate with different x", function () {
            var coordinate = new Coordinate(43, 4)
            var expectedPrevYCoordinate = new Coordinate(43, 3)
            var prevYCoordinate = coordinate.getPrevByY()

            expect(prevYCoordinate.isSame(expectedPrevYCoordinate)).toEqual(true)
        })
    })
})