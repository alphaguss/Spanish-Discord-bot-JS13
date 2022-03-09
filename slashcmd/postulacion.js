const { SlashCommandBuilder } = require('@discordjs/builders')
const Discord = require('discord.js')
const { color, check, error } = require('../config')
const discordModals = require('discord-modals')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('apply')
    .setDescription('Con este comando puedes postularte para ser taff'),
    //.addStringOption(option => option.setName('').setDescription('').setRequired(true)),

    async run(client, interaction) {

        const { Modal, TextInputComponent, showModal } = require('discord-modals') // Now we extract the showModal method

        const modal = new Modal()
    .setCustomId('idpostu')
    .setTitle('Postulacion')
    .addComponents(
        [
            new TextInputComponent()
        .setCustomId('Nombre')
        .setLabel('User de discord y edad')
        .setStyle('LONG')
        .setMinLength(1)
        .setMaxLength(408)
        .setPlaceholder('Ej: AkaAlex#5555 edad: 17')
        .setRequired(true)
        ],
        [
            new TextInputComponent()
            .setCustomId(`Porque`)
            .setLabel('Porque quieres ser staff?')
            .setStyle('LONG')
            .setMinLength(1)
            .setMaxLength(1000)
            .setPlaceholder(`Escribe algo...`)
            .setRequired(true)
        ],
        [
            new TextInputComponent()
            .setCustomId(`Nivel`)
            .setLabel(`Del 1 al 10 cuanto sabe de programacion?`)
            .setStyle(`SHORT`)
            .setMinLength(1)
            .setMaxLength(2)
            .setPlaceholder(`Nivel....`)
            .setRequired(true)
        ],
        [
            new TextInputComponent()
            .setCustomId(`preg1`)
            .setLabel('Que harias si a un user insultando')
            .setStyle(`LONG`)
            .setMinLength(1)
            .setMaxLength(1000)
            .setPlaceholder(`Pone tu respuesta...`)
            .setRequired(true)
        ],
        [
            new TextInputComponent()
            .setCustomId(`preg2`)
            .setLabel('Que harias si un user esta haciendo spam?')
            .setStyle(`LONG`)
            .setMinLength(1)
            .setMaxLength(1000)
            .setPlaceholder(`Pone tu respuesta...`)
            .setRequired(true)
        ]

    );
    showModal(modal, {
        client: client,
        interaction: interaction
      })
    }
}