const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')
const discordModals = require('discord-modals')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('npm')
    .setDescription('Subir un npm'),
    //.addStringOption(option => option.setName('').setDescription('').setRequired(true)),

    async run(client, interaction) {
        
        const { Modal, TextInputComponent, showModal } = require('discord-modals')

        const modal = new Modal()
        .setCustomId('idnpm')
        .setTitle('Subir npm')
        .addComponents(
            [
                new TextInputComponent()
                .setCustomId('nombrenpm')
                .setLabel('Nombre del npm')
                .setStyle('SHORT')
                .setMinLength(1)
                .setMaxLength(100)
                .setPlaceholder('Nombre del npm....')
                .setRequired(true)
            ],
            [
                new TextInputComponent()
                .setCustomId('autor')
                .setLabel('Autor npm')
                .setStyle('SHORT')
                .setMinLength(1)
                .setMaxLength(100)
                .setPlaceholder('Autor npm....')
                .setRequired(true)
            ],
            [
                new TextInputComponent()
                .setCustomId('Descrpcion')
                .setLabel('Descripcion del npm')
                .setStyle('LONG')
                .setMinLength(1)
                .setMaxLength(100)
                .setPlaceholder('Escribe algo....')
                .setRequired(true)
            ],
            [
                new TextInputComponent()
                .setCustomId('link')
                .setLabel('Link del npm')
                .setStyle('SHORT')
                .setMinLength(1)
                .setMaxLength(100)
                .setPlaceholder('links')
                .setRequired(true)
            ]
        );
        showModal(modal, {
            client: client,
            interaction: interaction
          })

    }
}