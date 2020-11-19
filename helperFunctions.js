// Importing the required packages
const PREFIX = process.env.PREFIX

// Test command
const ping = async (message) => {
    await message.reply("🏓 Pong!")
}

// Command validation
const validate = (message, commands) => {

    // Iterate through the commands array
    for (let cmd of commands) {
        // If cmd fits the template, then
        if (message.content.toLowerCase().startsWith(`${PREFIX}${cmd} `) || message.content === `${PREFIX}${cmd}`) {
            // Log these
            const currDate = Date.now()
            const timestamp = new Date(currDate).toDateString()

            // Message author (command sender)
            console.log(`Executed by ${message.author.tag}`)
            // Which command has been executed
            console.log(`Current command: ${PREFIX}${cmd}`)
            // The current timestamp
            console.log(`Timestamp: ${timestamp}`)
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
}