const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')
const memes = require("discord-memes");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('meme')
    .setDescription('Te da un meme'),
    ///.addStringOption(option => option.setName('').setDescription('').setRequired(true)),

    async run(client, interaction) {

        interaction.reply(memes.imagenesEspañol())
        
    }
}