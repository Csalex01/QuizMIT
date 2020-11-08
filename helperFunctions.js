// Importing the required packages
const PREFIX = process.env.PREFIX
// const Discord = require("discord.js")

// Test command
const ping = (message) => {
    message.reply("🏓 Pong!")
}

// Gets the arguments of a command
const getArgs = (message, command) => {
    return message.content.replace(`${PREFIX}${command} `, "")
}

// Command validation
const validate = (message, commands) => {

    // Iterate through the commands array
    for (let cmd of commands) {
        // If cmd fits the template, then
        if (message.content.toLowerCase().startsWith(`${PREFIX}${cmd} `) || message.content === `${PREFIX}${cmd}`) {
            // Log these
            console.log("-----")

            // Message author (command sender)
            console.log(`Executed by ${message.author.tag}`)
            // Which command has been executed
            console.log(`Current command: ${PREFIX}${cmd}`)
            // The arguments of a given command
            console.log(`Argument(s): ${getArgs(message, cmd)}`)
            // The current timestamp
            console.log(`Timestamp: ${Date.now()}`)

            console.log("-----")

            // Return true, successful validation
            return true;
        }
    }

    // If cmd is wrong, the validation has failed
    return false
}


// Exports the functions as a module
module.exports = {
    validate,
    ping,
    filter
}