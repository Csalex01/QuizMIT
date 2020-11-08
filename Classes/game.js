// Import neccessary modules (Player)
const PlayerClass = require("./player")

// Create the game class
class GameClass {
    // The constructor of the class
    constructor() {
        // Define the properties of the class
        this.player = null
        this.correctAnswers = 0
        this.wrongAnswers = 0
        this.points = 0
        this.status = "stopped"

    }

    // Member function
    beginGame = (player) => {
        // Assign a new player to the game
        this.player = player
        this.status = "running"
        console.log(`PlayerID: ${this.player.id}`);
    }
}

module.exports = GameClass