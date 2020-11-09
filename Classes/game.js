// Import neccessary modules (Player)
const Question = require("./question")

// Initialize the questions
// FIX: Get data from database/JSON file
let questions = [
    {
        question: "This is a placeholder text to test how long Discord is capable of writing text in an embed message without line wrapping",
        answer1: "TV1",
        answer2: "TV2",
        answer3: "TV3",
        answer4: "TV4",
        correctAnswer: 0
    },
    {
        question: "Teszt kérdés!",
        answer1: "Teszt válasz 1",
        answer2: "Teszt válasz 2",
        answer3: "Teszt válasz 3",
        answer4: "Teszt válasz 4",
        correctAnswer: 1
    }
]

// Create the game class
class GameClass {
    // The constructor of the class
    constructor() {
        // Define the properties of the class
        this.player = null
        this.status = "stopped"
        this.questions = []
        this.questionCount = 2
        this.currentQuestion = null
        this.currentQuestionNumber = 0
        this.acceptedAnswers = ["0️⃣", "1️⃣", "2️⃣", "3️⃣"]

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
    }
}

module.exports = GameClass