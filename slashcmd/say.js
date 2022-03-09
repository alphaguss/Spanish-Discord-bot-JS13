const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')
const discordModals = require('discord-modals')


module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Este comando te deja decir algo con el bot'),

    async run(client, interaction) {

        let permiso = interaction.member.permissions.has("ADMINISTRATOR")
        if(!permiso) return interaction.reply("No tienes permisos")


        const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method

    const modal = new Modal()
.setCustomId('idsay')
.setTitle('Say')
.addComponents(
  new TextInputComponent()
  .setCustomId('idsay')
  .setLabel('Lo que quieres decir')
  .setStyle('LONG')
  .setMinLength(1)
  .setMaxLength(4000)
  .setPlaceholder('Escribe algo...')
  .setRequired(true)
);

showModal(modal, {
    client: client,
    interaction: interaction
  })

  



    }
}