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

const reactionOptions = { min: 2, max: 2, time: 10000 }

// On successful login
Client.on('ready', () => {
    console.log(`Logged in as: ${Client.user.tag}!`)
});

// On message
Client.on('message', async message => {
    // Test command
    if (validate(message, "ping"))
        ping(message);

    // Starts the game
    // Valid inputs: .kezd, .kezdes
    else if (validate(message, ["kezdes", "kezd"])) {
        Player = new PlayerClass(message.author.tag)

        let botReply = await message.reply(`Kattints a ✅ reakciógombra a kezdésért!!`)
        await botReply.react("✅")
    }
});

Client.on("messageReactionAdd", (reaction, user) => {
    const message = reaction.message

    if (Client.user.tag == user.tag)
        return

    if (Game.status == "stopped" && reaction.emoji.name == "✅") {
        console.log(reaction.emoji.name)
        message.channel.send("KEZDŐDIK!")
        Game.beginGame(Player)

        return
    }

    console.log("Already running!")
})

// Login
Client.login(`${BOT_TOKEN}`)