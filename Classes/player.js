
// PlayerClass definition
class PlayerClass {
    // Class constructor
    constructor(userId) {
        // User id (unique for each player)
        this.id = userId

        // Score counting
        this.correctAnswers = 0
        this.wrongAnswers = 0
        this.score = 0
    }
}

// Export the PlayerClass as a module
module.exports = PlayerClass