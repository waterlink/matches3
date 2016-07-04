function Player(gameField) {

}

Player.GameField = function () {

}

Player.Cell = function () {
    this.isSame = function () {
        return true
    }
}

if (typeof module != "undefined") {
    module.exports = Player
}