const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')
const snipe = require("../Schemas/snipeSchema")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('snipe')
    .setDescription('Muestra mensajes borrados'),
    //.addStringOption(option => option.setName('').setDescription('').setRequired(true)),

    async run(client, interaction) {

        let data = await snipe.findOne({ channelId: interaction.channel.id})

        if(!data){
            return interaction.reply({ content: 'No hay mensajes borrados'})
            
        }

        let embed = new Discord.MessageEmbed()
        .setTitle(`Mensaje de ${data.author}`)
        .addField('Mensaje eliminado:', `${data.message}`)
        .addField('Tiempo:', `<t:${data.time}:r>`, true)
        .setColor(RANDOM)
        .addField('Canal', `<#${data.channelId}>`, true)
        .setTimestamp()

        interaction.reply({ embeds: [embed]})
        
    }
}