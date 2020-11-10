// Importing the required packages
require('dotenv').config()

const Discord = require('discord.js')
const Client = new Discord.Client()

// Imports the helper functions from 
// the module ./helperFunctions.js
const {
    validate,
    ping,
} = require("./helperFunctions")

// Import the required modules for the game
// (PlayerClass, GameClass);
const PlayerClass = require("./Classes/player")
const GameClass = require("./Classes/game")

// Initialize the Game object
let Game = new GameClass()
let Player = null

// Get the BOT_TOKEN from process.env (handled by the `dotenv` package)
const BOT_TOKEN = process.env.BOT_TOKEN

// Authenticate the bot
Client.login(`${BOT_TOKEN}`)

// On successful login
Client.on('ready', () => {
    // Debug message (DO NOT REMOVE)
    // Confirms successful login
    console.log(`Logged in as: ${Client.user.tag}!`)
});

// On message
Client.on('message', async message => {
    // Test command
    if (validate(message, "ping"))
        ping(message);

    // Starts the game
    // Valid inputs: .kezd, .kezdes
    else if (validate(message, ["kezdes", "kezd", "start"])) {
        if (Game.status == "running") {
            message.channel.send("❌ A játék már fut!")
            return
        } else {
            Player = new PlayerClass(message.author.tag)

            let botReply = await message.reply(`Kattints a ✅ reakciógombra a kezdésért!!`)
            await botReply.react("✅")
        }
    }

    else if (validate(message, ["kilep", "stop"])) {
        // If the game is running
        if (Game.status == "running") {
            // Restart the game
            Game.reset()
            message.channel.send("Sikeresen kiléptél a játékból! ✅")
        }
        // Otherwise, the game has not started yet 
        else {
            message.channel.send("A játék nincs elkedzve! ❌")
        }
    }

    // DEBUG MESSAGE (REMOVE LATER)
    // console.log(Game.status)
});

// When a user reacts to a message, this gets called
// Note: This function is asyncronous because it needs to make calls
//       to the Discord API and recieves a Promise as response.
Client.on("messageReactionAdd", async (reaction, user) => {
    // gets the message based on the reaction
    const message = reaction.message

    // If the bot reacted (added a reaction to the list), skip
    if (Client.user.tag == user.tag)
        return

    // Else if the game state is stopped and the user is ready, start the game
    if (Game.status == "stopped" && reaction.emoji.name == "✅") {
        console.log(reaction.emoji.name)
        // "await" stops the code from execeution until promise is received
        await message.channel.send("A játék elkezdődött! A következő parancsal tudsz kilépni: `.kilep`🕹")

        // Let the game begin!
        Game.beginGame(Player)

        // Player is a pointer to Game.player
        Player = Game.player
    }

    // DEBUG MESSAGE (REMOVE LATER)
    console.log(reaction.emoji.name, Game.currentQuestion.correctAnswer)

    // If there is an incoming answer
    // FIX: Make this not emoji-oriented!
    if (Game.acceptedAnswers.includes(reaction.emoji.name)) {
        if (reaction.emoji.name == "0️⃣" && Game.currentQuestion.correctAnswer == 0)
            Player.correctAnswers += 1
        else if (reaction.emoji.name == "1️⃣" && Game.currentQuestion.correctAnswer == 1)
            Player.correctAnswers += 1
        else if (reaction.emoji.name == "2️⃣" && Game.currentQuestion.correctAnswer == 2)
            Player.correctAnswers += 1
        else if (reaction.emoji.name == "3️⃣" && Game.currentQuestion.correctAnswer == 3)
            Player.correctAnswers += 1
        else {
            console.log("WRONG ANSWER!")
        }
        Game.nextQuestion()
    }

    // While (if) the current game is running (+ off by 1 error correction)
    if (Game.currentQuestionNumber <= Game.questionCount - 1) {
        // Create a MessageEmbed object as response
        let embed = new Discord.MessageEmbed()
        let embedContent = ``

        // Set the properties of the embed message
        embed.setTitle(`${Game.currentQuestionNumber}. Kérdés: ${Game.currentQuestion.question} ❓`)
        embedContent += `Eddigi pontszámod: ${Player.correctAnswers}/${Game.questionCount}\n\n`
        embedContent += `0️⃣ ${Game.currentQuestion.answer1}\n`
        embedContent += `1️⃣ ${Game.currentQuestion.answer2}\n`
        embedContent += `2️⃣ ${Game.currentQuestion.answer3}\n`
        embedContent += `3️⃣ ${Game.currentQuestion.answer4}\n`
        embed.setColor("GREEN")
        embed.setDescription(embedContent)
        embed.setThumbnail(Client.user.displayAvatarURL())

        // Send the embed message
        let botReply = await message.channel.send(embed)

        // Add reactions to the embed message
        for (let reaction of Game.acceptedAnswers)
            await botReply.react(reaction)

        // DEBUG LOG
        console.log(Game.currentQuestion.correctAnswer)
    } else {
        // If the game is over
        // DEBUG MESSAGE (REMOVE LATER)
        console.log("GAME OVER")
        message.channel.send(`JÁTÉK VÉGE\nElért pontszám: ${Player.correctAnswers}\\${Game.questionCount}`)
        Game.reset()
    }
})