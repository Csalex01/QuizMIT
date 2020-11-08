// Importing the required packages
require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

// Imports the helper functions from 
// the module ./helperFunctions.js
const {
    validate,
    ping
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

// On successful login
client.on('ready', () => {
    console.log(`Logged in as: ${client.user.tag}!`)
});

// On message
client.on('message', message => {
    // Test command
    if (validate(message, "ping"))
        ping(message);

    // Starts the game
    // Valid inputs: .kezd, .kezdes
    else if (validate(message, ["kezdes", "kezd"])) {
        let Player = new PlayerClass(message.author.tag)
        Game.beginGame(Player)

        message.reply(`A játék elkezdődött!`);
    }
});

// Login
client.login(`${BOT_TOKEN}`)