const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Quitale el mute a alguien')
    .addUserOption(option => option.setName("miembro").setDescription('El miembro que sera muteado').setRequired(true)),
    //.addStringOption(option => option.setName('tiempo').setDescription('El tiempo que estara muteado').setRequired(true))
    //.addStringOption(option => option.setName('razon').setDescription('Razon del mute').setRequired(true)),

    async run(client, interaction) {

        let user = interaction.options.getUser("miembro")
        let member = await interaction.guild.members.fetch(user.id)
        let permisos = interaction.member.permissions.has('MODERATE_MEMBERS')



        if(!permisos) return interaction.reply({content: 'No tienes permisos'})


        if(!member.isCommunicationDisabled()) return interaction.reply({ content: 'El miembro no esta muteado'})

        await member.timeout(null)


        let embed = new Discord.MessageEmbed()
        .setTitle(`<a:Warning:921597673579094046> Alerta de unmute <a:Warning:921597673579094046>`)
        .addField(`Informacion del unmute:`, "info recopilada:")
        .addField("Usuario desmuteado:", `${user.tag}`)
        .setTimestamp()
        .setFooter({ text: `Desmuteado por: ${interaction.user.tag}`})
        .setColor('RANDOM')

        interaction.reply({ embeds: [embed]})

        

        
    }
}