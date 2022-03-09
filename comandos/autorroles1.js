const Discord = require('discord.js');


module.exports = {
  name: "asuiohgi9ahgihwgoihwiohwa", //nombre
  alias: [], //alias,

  execute(client, message, args) {

    const row = new Discord.MessageActionRow()
    .addComponents(
        [
        new Discord.MessageButton()
        .setCustomId('ping alianzas')
        .setLabel('Ping alianzas')
        .setStyle('DANGER')
        .setEmoji('🔥')
        ],
        [
            new Discord.MessageButton()
            .setCustomId('Ping pendejadas')
            .setLabel('Ping pendejadas')
            .setStyle('PRIMARY')
            .setEmoji('😎')
        ],
        [
            new Discord.MessageButton()
            .setCustomId('Ping sorteos')
            .setLabel('Ping sorteos')
            .setStyle("SUCCESS")
            .setEmoji('🎉')
        ],
        [
            new Discord.MessageButton()
            .setCustomId('Ping anuncios')
            .setLabel('Ping anuncios')
            .setStyle('SECONDARY')
            .setEmoji('❗')
        ]
    )

    let embed = new Discord.MessageEmbed()
        .setTitle(' 🔥 | Pings')
        .setDescription(" Escoje los pings que quieres que te lleguen")
        .setColor('GREEN')
        .setTimestamp()
        .setFooter({ text: "Pings"})

        message.channel.send({ embeds: [embed], components: [row]})

  }

}