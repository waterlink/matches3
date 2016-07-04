const Player = require("../src/Player")
const GameField = Player.GameField

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

function Cell() {
    
}

describe("Cell", function () {
    it("can be created", function () {
        var cell = new Cell()
    })
})