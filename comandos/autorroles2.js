const Discord = require('discord.js');


module.exports = {
  name: "agowsgiawhngioujwoigfhjawio", //nombre
  alias: [], //alias,

  execute(client, message, args) {

    const row = new Discord.MessageActionRow()
    .addComponents(
        [
        new Discord.MessageButton()
        .setCustomId('verificate')
        .setLabel('Verificate')
        .setStyle('SUCCESS')
        .setEmoji('✔️')
        ]
    )

    const embed = new Discord.MessageEmbed()
    .setTitle('Pulsa el boton para verificate')
    .setColor('GREEN')

    message.channel.send({ embeds: [embed], components: [row]})

  }

}