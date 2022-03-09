const fs = require('fs');
let { readdirSync } = require('fs');
const Discord = require('discord.js');
const config = require("./config.js");
const intents = new Discord.Intents(32767)
const client = new Discord.Client({ intents })
const discordModals = require('discord-modals')
discordModals(client);
const colors = require('colors');
const AsciiTable = require('ascii-table')
const spanishmemes = require('spanish.memes');
const meme = spanishmemes.Meme()
const memes = require("discord-memes");
const gamescord = require("gamescord");
const mongoose = require("mongoose");
const ms = require('ms')


client.slashcommands = new Discord.Collection();
const slashcommandsFiles = fs.readdirSync("./slashcmd").filter(file => file.endsWith("js"))


let table = new AsciiTable('Slash')


for(const file of slashcommandsFiles){
  const slash = require(`./slashcmd/${file}`)
  client.slashcommands.set(slash.data.name, slash)
  
  table
  .setHeading('Nombre', 'cargado')
    
  .addRow(`${file}`, "cargado correctamente 🤖")

    
}
console.log(table.toString())
client.on("interactionCreate", async(interaction) => {


  if(interaction.isButton()){
    if(interaction.customId === "crear"){
      let everyone = interaction.guild.roles.cache.find(r => r.name === "@everyone")
      interaction.guild.channels.create(`➙〔🗂️〕Ticket-${interaction.user.username}`, {
        type: "GUILD_TEXT",
        parent: "949430159092645958",
        permissionOverwrites: [
          {
            id: interaction.user.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          },
          {
            id: everyone.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
          }
        ]
      }).then(c => {
        let row = new Discord.MessageActionRow()
        .addComponents(
          new Discord.MessageButton()
          .setCustomId('closest')
          .setLabel('Cerrar ticket')
          .setStyle('DANGER')
          .setEmoji('⚠️')
        )
        let aembed = new Discord.MessageEmbed()
        .setTitle(`Ticket de ${interaction.user.username}`)
        .setDescription('Espere para el soporte en caso que no respondan pingee a un administrador o owner')
        .setColor('RANDOM')
        .setFooter({text: `Ticket ${interaction.user.username}`})
        .setTimestamp()
        c.send({content: `<@${interaction.user.id}>`, embeds: [aembed], components: [row]})
      })
      interaction.reply({ content: `<@${interaction.user.id}> Tu ticket fue creado correctamente`, ephemeral: true})
    }
  }

  if(interaction.isButton()){
    if(interaction.customId === "closest"){
      let row = new Discord.MessageActionRow()
      .addComponents(
        [
          new Discord.MessageButton()
        .setCustomId('confirm')
        .setLabel('Si')
        .setStyle('SUCCESS')
        .setEmoji('✔️')
        ],
        [
          new Discord.MessageButton()
          .setCustomId('no')
          .setLabel('no')
          .setStyle("DANGER")
          .setEmoji("❌")
        ]
      )

      let embed = new Discord.MessageEmbed()
      .setTitle('Estas seguro que deseas cerrar el ticket')
      .setColor('YELLOW')


      interaction.reply({embeds: [embed], components: [row]})
    }
  }

  if(interaction.isButton()){
    if(interaction.customId === 'confirm'){
      interaction.channel.delete()
    }
  }


  if(interaction.isButton()){
    if(interaction.customId === "no"){
      let embed = new Discord.MessageEmbed()
      .setTitle("Ok tu ticket seguira abierto")

      interaction.reply({ embeds: [embed]})
    }
  }





  if(!interaction.isCommand()) return;

  const slashcmds = client.slashcommands.get(interaction.commandName)

  if(!slashcmds) return;

  try{
    await slashcmds.run(client, interaction)
  } catch(e) {
    console.error(e)
  }









})





mongoose.connect("mongodb+srv://Just:just@just.yjl3l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" , {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  var table = new AsciiTable('Mongoose')
  .setHeading('Actividad', 'StatusMongoDB')
  .addRow('Mongoose', '✨ Conectado')

  console.log(table.toString())
}).catch((error) => {
  console.log(error)
})


client.on("messageDelete", async(message) => {
  const snipe = require("./Schemas/snipeSchema")

  let data = await snipe.findOne({ channelId: message.channel.id })

  if(!data){

    let newdata = new snipe({
      channelId: message.channel.id,
      message: message.content,
      author: message.author.tag,
      time: Math.floor(Date.now() / 1000)
    })

    return await newdata.save
  }

  await snipe.findOneAndUpdate({
    channel: message.channel.id,
    message: message.content,
    author: message.author.tag,
    time: Math.floor(Date.now() / 1000)
  })

})




client.on('messageCreate', async(message) => { 

  let prefix = config.prefix 

  if (message.author.bot) return;








  if (!message.content.startsWith(prefix)) return;

  let usuario = message.mentions.members.first() || message.member;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  if (cmd) {
    cmd.execute(client, message, args)

  }
  if(!cmd){
    if(message.content === prefix) return;
    const embed = new Discord.MessageEmbed()
    .setTitle('Wtf encontraste mi prefix')
    .setDescription(' Recuerda que este bot esta disponible solo con comandos de barra')
    .setColor('RED')

    message.reply({ content: '<@909368761562325022> Cambiame el prefix puto', embeds: [embed]})
  }

  const events = fs.readdirSync(path.join(__dirname, 'events'));
  for (const file of events) {
    const event = require(path.join(__dirname, 'events', file));
    client.on(event.name, (...args) => event.run(client, ...args));
  }


  if(message.content.startsWith('@here')){
    message.delete()
        message.channell.sned(`${author.tag} No intentes hacer here`)
  }


  if(message.content.startsWith('https://')){
    message.delete()
        message.channell.send(` ${author.tag} No mandes links`)
  }

  if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))){
      const embed = new Discord.MessageEmbed()
        .setTitle(` ${author.tag} `)
        .setDescription(` Hola ${author.tag} mi prefix actual es` + config.prefix)

        message.channel.send({ embeds: [embed]})
  }
}); ///evento messageCreate







client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./comandos/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
    function presence(){
        client.user.setPresence({
            status: 'idle',
            activities: [{
                name: '/help',
                type: 'PLAYING'
            }]
        })
    }
    presence();


  let table = new AsciiTable('Botinfo')
table
  .setHeading('Info', 'Valores')
  .addRow('prefix', `${config.prefix}`,)
  .addRow('conectado en', `${client.user.tag}`)
  .addRow('remike', 'Me la pela',)
 
  console.log(table.toString())




  client.channels.cache.get('944399676914958356').messages.fetch('944748592705454131').then(msg => {

    let ifilter = i => i.user.bot;

    const collector = msg.createMessageComponentCollector({ filer: ifilter})

    collector.on('collect', async i => {
        if(i.customId === "ping alianzas"){
            if(!i.member.roles.cache.has('944399682514321488')){
                await i.member.roles.add('944399682514321488')
                i.reply ({ content: 'Se agrego el rol ping alianzas correctamente', ephemeral: true })
            } else {
                i.reply ({ content: 'Ya tienes el rol de `Ping alianzas`', ephemeral: true })
            }
        }

        if(i.customId === "Ping pendejadas"){
            if(!i.member.roles.cache.has('944399683462234234')){
                await i.member.roles.add('944399683462234234')
                i.reply ({ content: 'Se agrego el rol ping pendejadas correctamente', ephemeral: true })
            } else {
              i.reply ({ content: 'Ya tienes el rol de `Ping pendejadas`', ephemeral: true })
            }
        }

        if(i.customId === "Ping sorteos"){
            if(!i.member.roles.cache.has('944399683940384849')){
                await i.member.roles.add('944399683940384849')
                i.reply ({ content: 'Se agrego el rol ping sorteos correctamente', ephemeral: true })
            } else {
                i.reply ({ content: 'Ya tienes el rol de `Ping sorteos`', ephemeral: true })
            }
        }

        if(i.customId === "Ping anuncios"){
            if(!i.member.roles.cache.has('944399684817010759')){
                await i.member.roles.add('944399684817010759')
                i.reply ({ content: 'Se agrego el rol ping anuncios correctamente', ephemeral: true })
            } else {
                i.reply ({ content: 'Ya tienes el rol de `Ping anuncios`', ephemeral: true })
            }
        }
    })
  })

  client.channels.cache.get("944399673475596288").messages.fetch("944748668328751165").then(msg => {
    let bfilter = i => !i.user.bot;
    const collector2 = msg.createMessageComponentCollector({ filter: bfilter})

    collector2.on('collect', async i =>{
      if(i.customId === "verificate"){
        if(!i.member.roles.cache.has("944399677229523015")){
          await i.member.roles.add('944399677229523015')
          i.reply({ content: " Gracias por verificarte :D ", ephemeral: true })
        } else {
          i.reply({ content: 'ya estas verificado', ephemeral: true })
        }
      }
    })
  })
}); ////Evento ready








client.on('guildMemberAdd', member => {
  const embed = new Discord.MessageEmbed()
  .setTitle(` Bienvenido`)
  .addField('Recuerda pasarte por', '<#940569446886559774> para no ser sancionado')
  .addField(' Tambien pasate por los chats de la comunidad', '<#944399682099093564> \n <#944399682891841547> \n <#944399684208840764>')
  .addField(' Y nuestros canales de informacion', "<#944399675807637544> \n <#944399676914958356> \n <#940569446886559774>")
  .setFooter("Bienvenidas")
  .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
  .setImage('https://media.discordapp.net/attachments/937870083328458813/939646404694011904/standard_13.gif')
  .setColor('RANDOM')

  client.channels.cache.get('944399675283353631').send({ content: `${member}`, embeds: [embed]})
}); ///Evento guildMemberAdd



client.on('modalSubmit', (modal) => {
  if(modal.customId === 'idsay'){
    const firstResponse = modal.getTextInputValue('idsay')
    modal.reply({ content: `${firstResponse}`})
  }  

  if(modal.customId === 'idembed'){
    const r1 = modal.getTextInputValue('Titulo')
    const r2 = modal.getTextInputValue('Descripcion')
    const r3 = modal.getTextInputValue('Footer')

    let embed = new Discord.MessageEmbed()
    .setTitle(`${r1}`)
    .setDescription(`${r2}`)
    .setFooter({ text: `${r3}`})

    modal.reply({ embeds: [embed]})
  }

  if(modal.customId === 'idpostu'){
    const nombre = modal.getTextInputValue('Nombre')
    const porque = modal.getTextInputValue('Porque')
    const nivel = modal.getTextInputValue('Nivel')
    const p1 = modal.getTextInputValue('preg1')
    const p2 = modal.getTextInputValue('preg2')

    let embed = new Discord.MessageEmbed()
    .setTitle(`Postulacion de ${nombre}`)
    .setDescription(` \n Porque quiere ser staff **${porque}** \n Nivel de programacion: **${nivel}** \n Que harias si ves a un user instultando?: **${p1}** \n Que harias si un user esta haciendo spam?: **${p2}** `)

    client.channels.cache.get(`947548402588221472`).send({ embeds: [embed]})
    modal.reply(' Su postulacion fue enviada correctamente')
  }

  if(modal.customId === 'idnpm'){
    let nombre = modal.getTextInputValue('nombrenpm')
    let link = modal.getTextInputValue('link')
    let description = modal.getTextInputValue('Descrpcion')
    let autor = modal.getTextInputValue('autor')

      let embed = new Discord.MessageEmbed()

      .setTitle(`NPM: ${nombre}`)
      .setDescription(` \n npm creado por: ${autor} \n Descripcion del npm: ${description} \n Link del npm: ${link}  `)

      client.channels.cache.get('947809134290554890').send({ embeds: [embed] })
      modal.reply('<#947809134290554890>')

  }
}) ///Modals









client.login(config.token)
