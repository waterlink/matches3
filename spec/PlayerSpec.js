const Player = require("../src/Player")
const GameField = Player.GameField
const Cell = Player.Cell

describe("Player", function () {
    it("can be created with game field", function () {
        var gameField = new GameField()
        var player = new Player(gameField)
    })
})

describe("GameField", function () {
    it("can be created", function () {
        var gameField = new GameField()
    })
    
    it("can have cells", function () {
        var gameField = new GameField()
        // gameField.add(new Coordinate(0, 0), new Cell())
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