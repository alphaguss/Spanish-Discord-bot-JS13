const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutea a un mimembro del servidor')
    .addUserOption(option => option.setName("miembro").setDescription('El miembro que sera muteado').setRequired(true))
    .addStringOption(option => option.setName('tiempo').setDescription('El tiempo que estara muteado').setRequired(true))
    .addStringOption(option => option.setName('razon').setDescription('Razon del mute').setRequired(true)),

    async run(client, interaction) {

        let user = interaction.options.getUser("miembro")
        let tiempo = interaction.options.getString("tiempo")
        let razon = interaction.options.getString("razon")
        let member = await interaction.guild.members.fetch(user.id)
        let time = ms(tiempo)
        let permisos = interaction.member.permissions.has('MODERATE_MEMBERS')



        if(!permisos) return interaction.reply({content: 'No tienes permisos'})


        if(member.isCommunicationDisabled()) return interaction.reply({ content: 'El miembro ya esta muteado'})

        await member.timeout(time, razon)


        let embed = new Discord.MessageEmbed()
        .setTitle(`<a:Warning:921597673579094046> Alerta de mute <a:Warning:921597673579094046>`)
        .addField(`Informacion del mute:`, "info recopilada:")
        .addField("Usuario muteado:", `${user.tag}`)
        .addField("Tiempo:", `${tiempo}`)
        .addField('Razon:', `${razon}`)
        .setTimestamp()
        .setFooter({ text: `Muteado por: ${interaction.user.tag}`})
        .setColor('RANDOM')

        interaction.reply({ embeds: [embed]})





        let embeda = new Discord.MessageEmbed()
        .setTitle(`${interaction.user.tag} muteo a ${user.tag} por ${razon} duracion ${tiempo}`)







        client.channels.cache.get("949447942287265862").send({embeds: [embeda]})

        

        
    }
}