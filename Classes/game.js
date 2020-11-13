'use strict';

// Import neccessary modules
const Discord = require('discord.js')
const Question = require("./question")
// Required for file management
const fs = require("fs")

// Declare the variables required for the questions
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
        this.questionCount = 0
        this.currentQuestion = null
        this.currentQuestionNumber = 0
        this.acceptedAnswers = ["0️⃣", "1️⃣", "2️⃣", "3️⃣"]

        // Open JSON file
        JSONdata = fs.readFileSync("questions.json")
        // Parse JSONdata
        questions = JSON.parse(JSONdata).questions
    }

    // Member function
    beginGame = (player) => {
        // Assign a new player to the game
        this.player = player

        this.questionCount = questions.length
        this.status = "running"

        // Create 'questionCount' number of questions
        for (let i = 0; i < this.questionCount; i++) {
            this.questions.push(new Question(i, questions[i]))
        }
        this.currentQuestionNumber = 0

        // Set the current question to the first question in the stack
        this.currentQuestion = this.questions[this.currentQuestionNumber]
        console.log(this.currentQuestion)

        // DEBUG MESSAGE (REMOVE LATER)
        console.log(`PlayerID: ${this.player.id}`);
    }

    handleQuestion = async (message, reaction) => {
        // If there is an incoming answer
        // FIX: Make this not emoji-oriented!
        if (this.acceptedAnswers.includes(reaction.emoji.name)) {
            if (reaction.emoji.name == "0️⃣" && this.currentQuestion.correctAnswer == 0)
                this.player.correctAnswers += 1
            else if (reaction.emoji.name == "1️⃣" && this.currentQuestion.correctAnswer == 1)
                this.player.correctAnswers += 1
            else if (reaction.emoji.name == "2️⃣" && this.currentQuestion.correctAnswer == 2)
                this.player.correctAnswers += 1
            else if (reaction.emoji.name == "3️⃣" && this.currentQuestion.correctAnswer == 3)
                this.player.correctAnswers += 1
            else
                console.log("WRONG ANSWER!")

            this.nextQuestion()
        }

        // While (if) the current this is running (+ off by 1 error correction)
        if (this.currentQuestionNumber <= this.questionCount - 1) {
            // Create a MessageEmbed object as response
            let embed = new Discord.MessageEmbed()
            let embedContent = ``

            // Set the properties of the embed message
            embed.setTitle(`${this.currentQuestionNumber}. ${this.currentQuestion.question}`)
            embedContent += `Eddigi pontszámod: ${this.player.correctAnswers}/${this.questionCount}\n\n`
            embedContent += `0️⃣ ${this.currentQuestion.answer0}\n`
            embedContent += `1️⃣ ${this.currentQuestion.answer1}\n`
            embedContent += `2️⃣ ${this.currentQuestion.answer2}\n`
            embedContent += `3️⃣ ${this.currentQuestion.answer3}\n`
            embed.setColor("GREEN")
            embed.setDescription(embedContent)
            embed.setThumbnail(this.currentQuestion.imgURL)

            // Send the embed message
            let botReply = await message.channel.send(embed)

            // Add reactions to the embed message
            for (let reaction of this.acceptedAnswers)
                await botReply.react(reaction)

            // DEBUG LOG
            console.log(this.currentQuestion.correctAnswer)
        } else {
            // If the game is over
            // DEBUG MESSAGE (REMOVE LATER)
            console.log("GAME OVER")
            message.channel.send(`JÁTÉK VÉGE\nElért pontszám: ${this.player.correctAnswers}\\${this.questionCount}`)
            this.reset()
        }
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