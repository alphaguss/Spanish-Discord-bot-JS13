const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const Discord = require('discord.js')
const { color, check, error } = require('../config')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription(' Te da el ping del bot'),

    async run(client, interaction) {

        interaction.reply({ content: ` 🎾 | Pong! \n 📨 | ${client.ws.ping} ms`})
        
    }
}