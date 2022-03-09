const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')
const discordModals = require('discord-modals')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Te deja crear un embed a tu gusto'),
    //.addStringOption(option => option.setName('').setDescription('').setRequired(true)),

    async run(client, interaction) {


        const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method

        const modal = new Modal()
    .setCustomId('idembed')
    .setTitle('Embed!')
    .addComponents(
      [
        new TextInputComponent()
        .setCustomId('Autor')
        .setLabel('Autor del embed')
        .setStyle('SHORT')
        .setMaxLength(1)
        .setMaxLength(100)
        .setPlaceholder('Autor...')
        .setRequired(false)
      ]
      [
          new TextInputComponent()
      .setCustomId('Titulo')
      .setLabel('Titulo')
      .setStyle('LONG')
      .setMinLength(1)
      .setMaxLength(50)
      .setPlaceholder('Pone tu titulo aqui')
      .setRequired(true)
      ],
      [
        new TextInputComponent()
        .setCustomId('Descripcion')
        .setLabel('Descripcion')
        .setStyle('LONG')
        .setMinLength(0)
        .setMaxLength(900)
        .setPlaceholder('Pone tu descripcion aqui....')
        .setRequired(true)

      ],
      [
          new TextInputComponent()
          .setCustomId('Footer')
          .setLabel('Footer')
          .setStyle('LONG')
          .setMinLength('0')
          .setMaxLength(25)
          .setPlaceholder('Pone tu footer aqui')
          .setRequired(true)
      ]
    );
    
    showModal(modal, {
        client: client,
        interaction: interaction
      })
        
    }
}