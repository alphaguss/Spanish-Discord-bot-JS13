const fs = require('fs')
const Discord = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const { clientId, guild, token } = require('./config.json')
const commands = []
const commandsFiles = fs.readdirSync('./slashcmd').filter(file => file.endsWith('js'))
var colors = require('colors');

for (const file of commandsFiles) {
    const slash = require(`./slashcmd/${file}`)
    commands.push(slash.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken("")
createSlash()
async function createSlash() {
    try {
        await rest.put(
            Routes.applicationCommands(clientId), {
                body: commands
            }
        )
        console.log('[SlashCmd]'.rainbow + ' Comandos cargados'.rainbow)
    } catch(e) {
        console.error(e)
    }
}