'use strict';

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
    if (validate(message, ["ping"]))
        await ping(message);

    // Help functionality
    // Valid inputs: .help, .segitseg, .segits
    else if (validate(message, ["help", "segitseg", "segits"])) {
        let embed = new Discord.MessageEmbed()
        let embedContent = ``

        // Add content for the embed message
        embedContent += `**A következő parancsok állnak rendelkezésre:\n**`
        embedContent += `🏁 A játék indításához: \`.start\`, \`.kezd\`, \`.kezdes\`\n`
        embedContent += `⛳ A játék befejezéséhez: \`.stop\`, \`.kilep\`\n`
        embedContent += `🤔 A bot jelenlétének ellenőrzéséért: \`.ping\`\n`
        embedContent += `❓ Segítségkérésért: \`.help\`, \`.segitseg\`, \`.segits\``

        // Set properties
        embed.setTitle(`🚨 Segítség 🚨`)
        embed.setColor("BLUE")
        embed.setDescription(embedContent)

        // Send to channel
        await message.channel.send(embed)
    }

    // Starts the game
    // Valid inputs: .kezd, .kezdes
    else if (validate(message, ["kezdes", "kezd", "start"])) {
        // If the game is running
        if (Game.status == "running") {
            // Then you cannot start the game
            message.channel.send("❌ A játék már fut!")
            return
        } else {
            // Create a new player
            Player = new PlayerClass(message.author.tag)

            // Send feedback
            let botReply = await message.reply(`Kattints a ✅ reakciógombra a kezdésért 😁`)
            await botReply.react("✅")
        }
    }

    // Exits the game
    // Valid inputs: .kilep, .stop
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
});

// When a user reacts to a message, this gets called
// Note: This function is asyncronous because it needs to make calls
//       to the Discord API and recieves a Promise as response.
Client.on("messageReactionAdd", async (reaction, user) => {
    // gets the message based on the reaction
    const message = reaction.message

    // If the bot reacted (added a reaction to the list), skip
    if (Client.user.tag == user.tag && user.tag != Player.id)
        return

    // Else if the game state is stopped and the user is ready, start the game
    if (Game.status == "stopped" && reaction.emoji.name == "✅") {
        // DEBUG MESSAGE (REMOVE LATER)
        // console.log(reaction.emoji.name)

        // "await" stops the code from execeution until promise is received
        await message.channel.send("A játék elkezdődött! A következő parancsal tudsz kilépni: `.kilep`🕹")

        // Let the game begin!
        Game.beginGame(Player)

        // Player is a pointer to Game.player
        Player = Game.player
    }

    // Handle the response and disply next question
    Game.handleQuestion(message, reaction)
})