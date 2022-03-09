const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Eliminar gran cantidad de mensajes')
    .addStringOption(option => option.setName('mensajes').setDescription('El numero de mensajes que quieres eliminar').setRequired(true)),

    async run(client, interaction) {

        let prermisos = interaction.member.permissions.has('MANAGE_MESSAGES')
        if(!prermisos) return interaction.reply({ content: "No tienes permisos para esto"})

        let numer = interaction.options.getString("mensajes")

        interaction.channel.bulkDelete(numer)
        


        let embed = new Discord.MessageEmbed()
        .setTitle('<a:Flecha:945726576648134677> Clear')
        .setDescription(` Elimine ${numer} mensajes`)

        interaction.reply({ embeds: [embed]})


            let embeda = new Discord.MessageEmbed()
            .setTitle(`${interaction.user.username} uso el clear con ${numer} mensajes`)

        client.channels.cache.get("949447942287265862").send({embeds: [embeda]})


        
    }
}