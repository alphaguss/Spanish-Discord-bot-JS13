const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')
const { Calculator } = require('slash-calculator');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('calculadora')
    .setDescription('Te abre una calculadora'),
    // .addStringOption(option => option.setName('').setDescription('').setRequired(true))

    async run(client, interaction) {



await Calculator({
    interaction: interaction,
    embed: {
        title: 'Calculadora',
        color: '#5865F2',
        timestamp: true
    },
    disabledQuery: 'La calculadora está desactivada!',
    invalidQuery: 'La ecuación proporcionada no es válida!',
    othersMessage: 'Solo <@{{author}}> puede usar los botones!'
});
        
    }
}