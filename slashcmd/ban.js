const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Para banear gente.")
    .addUserOption((option) => option.setName('user').setDescription('La persona que quieres banear').setRequired(true))
    .addStringOption(option => option.setName('razon').setDescription('Razon del ban').setRequired(true)),
    run: async (client, interaction) => {

     

       if(!interaction.member.permissions.has("BAN_MEMBERS")) return interaction.reply({ content: "No tienes permisos para ejecutar este comando.", ephemeral: true })

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.reply(" menciona a alguien");
        const razon = interaction.options.getString('razon')

        if(!member.bannable || member.user.id === client.user.id) 
        return interaction.reply(" No puedo banear a este miembro ");
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.reply(' Este miembro tiene un rol mas alto al tuyo')
        

        
        const embed = new Discord.MessageEmbed()
        .setTitle('<a:Warning:921597673579094046> Alerta de ban <a:Warning:921597673579094046>')
        .setDescription(' **Informacion del ban**')
        .addField(' Usuario baneado', ` <@${user.id}>`)
        .addField(' Moderador a cargo del ban', ` ${interaction.user.tag}`)
        .addField(' Razon del ban', ` ${razon}`)
        .setTimestamp()

        member.ban({ razon })

         interaction.reply({ embeds: [ embed ]})

        let embeda = new Discord.MessageEmbed()
        .setTitle(`${interaction.user.username} Baneo a ${user} por ${razon}`)









        client.channels.cache.get("949447942287265862").send({embeds: [embeda]})

    
    },
    
};