// Import neccessary modules
const Question = require("./question")
// Required for file management
const fs = require("fs")

// Initialize the questions
// FIX: Get data from database/JSON file
let questions
let JSONdata

// Create the game class
class GameClass {
    // The constructor of the class
    constructor() {
        // Define the properties of the class
        this.player = null
        this.status = "stopped"
        this.questions = []
        this.questionCount = 5
        this.currentQuestion = null
        this.currentQuestionNumber = 0
        this.acceptedAnswers = ["0️⃣", "1️⃣", "2️⃣", "3️⃣"]

        // OPen JSON file
        JSONdata = fs.readFileSync("questions.json")
        // Parse JSONdata
        questions = JSON.parse(JSONdata).questions
    }

    // Member function
    beginGame = (player) => {
        // Assign a new player to the game
        this.player = player
        this.status = "running"

        // Create 'questionCount' number of questions
        for (let i = 0; i < this.questionCount; i++) {
            this.questions.push(new Question(i, questions[i]))
        }
        this.currentQuestionNumber = 0

        // Set the current question to the first question in the stack
        this.currentQuestion = this.questions[this.currentQuestionNumber]

        // DEBUG MESSAGE (REMOVE LATER)
        console.log(`PlayerID: ${this.player.id}`);
    }

    // Switch to next question
    nextQuestion = () => {
        // DEBUG LOG
        console.log("Next question!")
        this.currentQuestionNumber++
        this.currentQuestion = this.questions[this.currentQuestionNumber]
        return
    }

    // Resets the game (called when the user calls exit)
    reset = () => {
        // Sets the variables back to the default value
        this.player.correctAnswers = 0
        this.player.wrongAnswers = 0
        this.player.score = 0
        this.status = "stopped"
        this.currentQuestionNumber = 0
    }
}

// Export the GameClass as a module
module.exports = GameClass