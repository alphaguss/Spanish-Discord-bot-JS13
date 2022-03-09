const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('create-ticket')
    .setDescription('Este comando te deja crear un ticket de soporte'),
    //.addStringOption(option => option.setName('').setDescription('').setRequired(true)),

    async run(client, interaction) {

        let row = new Discord.MessageActionRow()

        .addComponents(
            new Discord.MessageButton()
            .setCustomId('crear')
            .setLabel('Crear Ticket')
            .setStyle('SUCCESS')
            .setEmoji('📨')
        )

        let embed = new Discord.MessageEmbed()
        .setTitle('Crear ticket')
        .setDescription('Para crear un ticket solo pulsa el boton')
        .setColor('GREEN')
        .setFooter({ text: 'Tickets'})

        interaction.reply({ embeds: [embed], components: [row], ephemeral: true })
        
    }
}