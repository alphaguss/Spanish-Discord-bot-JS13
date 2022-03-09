const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Ayuda con el bot'),

    async run(client, interaction) {

        const row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageSelectMenu()
          .setCustomId('Selecciona')
          .setPlaceholder('Selecciona tu opcion')
          .addOptions([
            {
              label: "Moderacion",
              description: "Estos son todos los comandos de moderacion",
              value: "mod",
              emoji: '📛'
            },
            {
              label: "Informacion",
              description: "Estos son todos los comandos de informacion",
              value: "info",
              emoji: '❗'
            },
            {
              label: "utilidad",
              description: "Estos son todos los comandos de utilidad",
              value: "utl",
              emoji: '⚒️'
            },
            {
              label: "Diversión",
              description: "Estos son tods los comandos de diversión",
              value: "div",
              emoji: "🤣"
            },
            {
              label: "Volver al menu principal",
              description: "Vuelve al menu principal",
              value: "menu",
              emoji: "👾"
            }
          ])
        )
  
        let embed = new Discord.MessageEmbed()
        .setTitle(" <a:aledpin:944399685118992454>| Menu de ayuda")
        .setDescription(`<a:baile3:935180723688710204> | Hola ${interaction.user.tag} bienvenido a mi panel de ayuda`)
        .addField('<a:af_money_volando:944414782767906846> | Mis modulos son', " 📛 | Moderacion \n ❗ | Informacion \n ⚒️ | Utilidad \n 🤣 | Diversión ")
        .addField('<a:Warning:921597673579094046> | En caso de bug', " Puedes pingear a algun staff o a los owners")
        .addField('<a:__:949436632531083365> | Te quieres postular a staff?', 'Ocupa el comando /apply')
        .addField("<a:panda_facha:942903743786127412> | Neecesitas soporte?", `Ocupa el comando /create-ticket`)
        .setTimestamp()
        .setColor('BLUE')
        .setThumbnail('https://cdn.discordapp.com/attachments/886496993537568798/942422456868696094/images.png')
  
  
        let sendmsg = await interaction.reply({ content: "ㅤ", embeds: [embed], components: [row] })
  
  
  
  
  
  
  
  
  
  
  
  
        let embed1 = new Discord.MessageEmbed()
        .setTitle(' Modulo de moderacion ')
        .addField(' En este modulo estan los siguientes comandos:', ' Ban \n Kick \n Clear \n Say \n mute \n unmute ')
        .setColor('RED')
        .setThumbnail('https://cdn.discordapp.com/attachments/943673928096829491/944106137677070426/images.png')
  
  
  
        
        let embed2 = new Discord.MessageEmbed()
        .setTitle(' El modulo de `Informacion` esta en mantenimiento')
        .setColor('RED')
  
  
  
  
  
  
  
  
        
        let embed3 = new Discord.MessageEmbed()
        .setTitle(' Modulo `Utilidad`')
        .addField('Estos son los comandos de `utilidad`', 'apply \n npm \n ping')
        .setColor('GREEN')
  
        
  
        let embed4 = new Discord.MessageEmbed()
        .setTitle(' Modulo Diversión')
        .setDescription(' meme \n embed \n calculadora')
        .setColor("GREEN")
  
  
  
  
  
  
  
        const collector = interaction.channel.createMessageComponentCollector({
          componentType: "SELECT_MENU"
        })
  
        collector.on('collect', async (collected) => {
          const value = collected.values[0]
  
          if(value === "mod"){
            await interaction.deferUpdate
            interaction.editReply({ embeds: [embed1]})
          }
  
          if (value === "info"){
            await interaction.deferUpdate
            interaction.editReply({ embeds: [embed2]})
          }
  
          if (value === "utl"){
            await interaction.deferUpdate
            interaction.editReply({ embeds: [embed3]})
          }
          
          if(value === "div"){
            await interaction.deferUpdate
            interaction.editReply({ embeds: [embed4] })
          }
          if(value === "menu"){
            await interaction.deferUpdate
            interaction.editReply({ embeds: [embed]})
          }
  
        })
        
    }
}