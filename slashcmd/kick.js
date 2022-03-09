const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Para kickear gente.")
    .addUserOption((option) => option.setName('user').setDescription('La persona que quieres kickear').setRequired(true))
    .addStringOption(option => option.setName('razon').setDescription('Razon del kick').setRequired(true)),
    run: async (client, interaction) => {

     

       if(!interaction.member.permissions.has("KICK_MEMBERS")) return interaction.reply({ content: "No tienes permisos para ejecutar este comando.", ephemeral: true })

        const user = interaction.options.getUser('user')
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => {})

        if(!member) return interaction.reply(" menciona a alguien");
        const razon = interaction.options.getString('razon')

        if(!member.bannable || member.user.id === client.user.id) 
        return interaction.reply(" No puedo kickear a este miembro ");
        
        if(interaction.member.roles.highest.position <= member.roles.highest.position) 
        return interaction.reply(' Este miembro tiene un rol mas alto al tuyo')
        

        
        const embed = new Discord.MessageEmbed()
        .setTitle('<a:Warning:921597673579094046> Alerta de kick <a:Warning:921597673579094046>')
        .setDescription(' **Informacion del kick**')
        .addField(' Usuario kickeado', ` <@${user.id}>`)
        .addField(' Moderador a cargo del kick', ` ${interaction.user.tag}`)
        .addField(' Razon del kick', ` ${razon}`)
        .setTimestamp()

        member.kick({ razon })

        return interaction.reply({ embeds: [ embed ]})

    
    },
    
};