const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, DiscordAPIError, PermissionFlagsBits } = require("discord.js")
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildEmojisAndStickers
    ]
});
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const Discord = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
const { EmbedBuilder } = require('discord.js');
const { cp } = require('node:fs');
const stableDiffusion = require('stable-difussion-js');
const SD = new stableDiffusion('sk-zGQBPdc8uB4iuvPQI4IQR9UwJUvx8njvKtjzcoSdMjs6GDun');
client.on("ready", () =>{
    const guild = client.guilds.cache.get("736146378022977626")
    console.log("bot opérationnel");
    const nombredeservs = client.guilds.cache.size
    client.user.setPresence({ activities: [{ name: `${nombredeservs},du moins pour l'instant..` }], status: 'online' })
    const guild2 = client.guilds.cache.get("736146378022977626")
    guild2.commands.set([repondre])
    client.application.commands.set([dessin])
});
//EVENTS--------------------------------------------------------------------------------------------------------------
const { Events } = require('discord.js')
client.on(Events.GuildMemberAdd, async member => {
    const guild = client.guilds.cache.get("736146378022977626")
    const nombredemembres = guild.memberCount
    member.guild.channels.cache.get('736146378022977629').send("Bienvenue à toi " + member.user.username + "! Nous sommes maintenant" +  ` ${nombredemembres} ` + "sur le serveur !..Pour l'instant !")
    console.log("nouveau membre ! ") 
}); 
client.on(Events.GuildMemberRemove, async member => {
    console.log('Un membre est parti')
})
const config = require("./config")
require('dotenv').config();
client.login(process.env.TOKEN);


//BAN------------------------------------------------------------------------------------------------------------------
const wrongemoji = client.emojis.cache.get("1055053753616715806")
const { GuildBanManager } = require("discord.js")

const commandeban = new SlashCommandBuilder()
    .setName('ban')
    .setDescription("pour bannir quelqu'un")
    .addUserOption(option => option.setName('utilisateur')
                                    .setRequired(true)
                                    .setDescription("personne à bannir"))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    
const EmbedDerreur = new EmbedBuilder()
    .setTitle("Erreur")
    .setDescription(`Une erreur est survenue !` )
    .setColor('ff5656')

client.on("interactionCreate", async interaction => {
    if(interaction.commandName === 'ban'){
        const guild = client.guilds.cache.get("736146378022977626")
        const banni = interaction.options.getUser("utilisateur")
        const iddubanni = banni.id
        const BanEmbed = new EmbedBuilder()
            .setTitle("Ban")
            .setDescription(` ${banni.username} ` + " a été banni !")
            .setColor(3066993)
            guild.bans.create(iddubanni)
        .then(() => interaction.reply({embeds: [BanEmbed]}))
        .catch(() => interaction.reply({embeds: [EmbedDerreur]}))
    }
})
//GIVEAWAY------------------------------------------------------------------------------------------------------------------
const data = new SlashCommandBuilder()
const guild = client.guilds.cache.get("1034117397315076177")
data.setName("giveaway")
data.setDescription('pour créer un giveaway ! (admins uniquement)')
data.addStringOption(option => 
    option.setName('prix').setRequired(true)
          .setDescription('ce qui aura à gagner'))
data.addNumberOption(option => 
    option.setName('temps').setRequired(true)
          .setDescription('temps avant la fin du giveaway')); 
          client.on("interactionCreate", async interaction => {
            if(interaction.isCommand()){
                if(interaction.commandName === 'giveaway'){
                    const prix = interaction.options.getString('prix')
                    const temps = interaction.options.getNumber("temps")
                    const serv = client.guilds.cache.get('1034117397315076177')
                    const millisecondsenunejournee = 86400000
                    const tempsenjournee = temps * millisecondsenunejournee
                    const GiveawayEmbed = new EmbedBuilder()
                        .setTitle('Giveaway !')
                        .setAuthor({ name: 'Topaz', iconURL: 'https://i.imgur.com/AfFp7pu.png%27%7D'})
                        .setDescription(`A Gagner : ${prix} \n Se termine dans : ${temps} journée `)
                        .setColor('9370db')
                    const message = await interaction.reply({ embeds: [GiveawayEmbed], fetchReply: true });
                    interaction.reply(message);
                    message.react('🎉');
                }
            }
        
        })
//PDP-------------------------------------------------------------------------------------------------------------------

const DIG = require("discord-image-generation");
const { dirname } = require('node:path');

const pdpcommande = new SlashCommandBuilder()
    .setName('photo-de-profil')
    .setDescription("pour prendre la photo de profil de quelquun ")
    .addUserOption(option =>
        option.setName('utilisateur')
        .setDescription("a qui veux tu prendre la photo de profil ")
        .setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)    
client.on("interactionCreate" , async interaction => {
    if(interaction.isCommand()) {
        if(interaction.commandName === "photo-de-profil"){
            const utilisateur = interaction.options.getUser('utilisateur');
            const pseudo = utilisateur.username
            const avatar = utilisateur.displayAvatarURL({ size: 4096, dynamic: true });    
        const pdpembed = new EmbedBuilder()
            .setTitle(`Photo de profil de ${pseudo}`)
            .setURL(avatar)
            .setColor("5cf4f0")
            .setImage(avatar)    
        interaction.reply({embeds: [pdpembed]})
        }
        
    }
})

//KICK-------------------------------------------------------------------------------------------------------------------------------
const test = new SlashCommandBuilder()
    .setName('kick')
    .setDescription("pour kick quelqu'un")
    .addUserOption(option => option.setName('utilisateur').setDescription('qui veux tu exclure ?').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
client.on("interactionCreate", interaction => {
    if(interaction.commandName === "kick") {
        const member = interaction.options.getMember("utilisateur");
        const ppdubot = client.user.displayAvatarURL({ dynamic: false, format: 'png' });
        const kickembed = new EmbedBuilder()
            .setTitle("Kick")
            .setDescription("Le membre"+    member.user.username + " a été kick avec succès !")
            .setAuthor({ name: 'Topaz', iconURL: `${ppdubot}`})
            .setColor("00fc7e")
          

        member.kick()
          .then(() => interaction.reply({embeds: [kickembed]}))
          .catch(() => interaction.reply({embeds: [EmbedDerreur]}));
        
    }
});
//AIDESSIN-------------------------------------------------------------------------------------------------------------
const dessin = new SlashCommandBuilder();
dessin.setName("dessin")
    .setDescription("pour dessiner ! (stable diffusion)")
    .addStringOption(option =>
        option.setName("description")
              .setDescription("que veux tu dessiner ?")
              .setRequired(true))
client.on("interactionCreate", async interaction => {
    if(interaction.commandName === "dessin") {
        const contenududessin = interaction.options.getString("description")
        const stableDiffusion = require('stable-difussion-js');
        const SD = new stableDiffusion('sk-zGQBPdc8uB4iuvPQI4IQR9UwJUvx8njvKtjzcoSdMjs6GDun');
        const wait = require('node:timers/promises').setTimeout;
        var base64ToImage = require('base64-to-image');
        interaction.reply(`Veuillez patienter.. entrain de dessiner "${contenududessin}"`)
        SD.makeImage({
            search: `${contenududessin}`,
            outputPath: path.join(__dirname, 'img')
        })
        .then(data => {
            console.log('Image', data);
            interaction.channel.send({files: [data.file]})
            const path = `${data.file}`;
            
        })
        .catch(err => {
            console.log('Error', err);
        })
    }
})
//SIGNALERPROBLEME---------------------------------------------------------------------------------------------------------------------------------
const report = new SlashCommandBuilder()
    .setName("signaler-probleme")
    .setDescription("pour report un bug ou partager une idee")
    .addStringOption(option => 
        option.setName("idee")
        .setRequired(true)
        .setDescription("quel est ton idee "));
        client.on("interactionCreate", interaction => {
            if(interaction.commandName === 'signaler-probleme') {
                const guild = client.guilds.cache.get("736146378022977626")
                const salon = guild.channels.cache.get("736146378022977629")
                const message = interaction.options.getString("idee")
                const pdpdumec = interaction.user.displayAvatarURL({ size: 4096, dynamic: true }); 
                const ideeembed = new EmbedBuilder()
                    .setTitle("Une idée !")
                    .setAuthor({ name: `${interaction.user.username}`, iconURL: `${pdpdumec}`})
                    .setDescription(`${message} \n Vient de : ${ interaction.guild.name } \n ID de la personne : ${interaction.user.id}`)
                const embeddeconfirmation = new EmbedBuilder()
                    .setTitle("Idée")
                    .setDescription(`Bonjour ${interaction.user.username} ! Ton signalement/ton idée a été envoyé avec succès !`)
                    .setColor("00fc7e")    
                interaction.reply({embeds: [embeddeconfirmation]})
                salon.send({embeds: [ideeembed]})
                    
            }
        })
//REPONDRE-------------------------------------------------------------------------------------------------------------------
const repondre = new SlashCommandBuilder()
    .setName("repondre")
    .setDescription("repondre a quelqu'un")
    .addStringOption(option => 
        option.setName("id").setDescription("la personne a qui tu veux envoyer le message").setRequired(true))
        .addStringOption(option => 
            option.setName("message").setRequired(true).setDescription("le message que tu-souhaites envoyer"))
            client.on("interactionCreate", async interaction =>{
                if(interaction.commandName === "repondre"){
                    const iddumec = interaction.options.getString("id")
                const message = interaction.options.getString("message")
                const embeddeconfirmation = new EmbedBuilder()
                    .setTitle("Message envoyé !")
                    .setDescription(`Le message a été envoyé avec succès !` )
                    .setColor("Aqua")
                const embedenvoyé = new EmbedBuilder()
                    .setTitle("Réponse")
                    .setDescription(`${message} \n Signé ${interaction.user.username}`)
                    .setColor("Aqua")
                client.users.send(iddumec, {embeds: [embedenvoyé]})  
                .then(() => interaction.reply({embeds: [embeddeconfirmation]}))
                .catch(() => interaction.channel.send({embeds: [EmbedDerreur]}))}
                
                  
            })
    