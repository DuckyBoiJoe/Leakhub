const Discord = require('discord.js')
const Bot = new Discord.Client()
const prefix = '!'
const blacklist = ['nigga', 'nigger', 'nig', 'n i g']

Bot.on('ready', () => {
    console.log('Leakhub is ready')
})

Bot.on('guildMemberAdd', member => {
    const chan = member.guild.channels.cache.find(c => c.name == 'welcome' && c.type == 'text')
    chan.send(`Welcome <@${member.user.id}> to LeakHub`)
    let role = member.guild.roles.cache.find(r => r.name == 'Members')
    member.roles.add(role).catch(console.error)
    
    
})
Bot.on('message', message => {
    let args = message.content.substring(prefix.length).split(/ +/)


    if(message.content.startsWith(`${prefix}kick`)) {
        message.delete()
        if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send(`${message.author.username} just tried to execute the kick command without permissions, can we get a :clap: in the chat?`)
        const user = message.mentions.members.first()
        if(!user) return message.channel.send('Remember to mention someone.')
        const member = message.guild.member(user)
        if(!member) return message.channel.send('That user is not in the server')
        const stufftosend = args.join(' ').slice(22)
        member.send(`You have been kicked from Leakhub. \nReason: ${stufftosend}`)
        member.kick(stufftosend)
        message.channel.send(`Successfully kicked ${member.user.username}`)
        const chann = message.guild.channels.cache.find(c => c.name == 'logs' && c.type == 'text')
        chann.send(`${message.author} just banned ${member.user.username} \nReason: ${stufftosend}`)
    }

    if(message.content.startsWith(`${prefix}ban`)) {
        message.delete()
        if(!message.member.permissions.has('BAN_MEMBERS')) return message.channel.send(`${message.author.username} just tried to execute the ban command without permissions, can we get a :clap: in the chat?`)
        const user = message.mentions.members.first()
        if(!user) return message.channel.send('Remember to mention someone.')
        const member = message.guild.member(user)
        if(!member) return message.channel.send('That user is not in the server')
        const stufftosend = args.join(' ').slice(22)
        member.send(`You have been banned from Leakhub. \nReason: ${stufftosend}`)
        member.ban(stufftosend)
        message.channel.send(`Successfully banned ${member.user.username} :hammer:`)
        const chann = message.guild.channels.cache.find(c => c.name == 'logs' && c.type == 'text')
        chann.send(`${message.author} just banned ${member.user.username} \nReason: ${stufftosend}`)
    }

    if(message.content.startsWith(`${prefix}tag`)) {
        if(!args[1]) return message.channel.send('Please specify a tag.')
        if(args[1].toLowerCase == 'info') {
            message.channel.send('You can get all the rules and info at #rules-info')
        }


    }


    let found = false
    var word = ''
    for (var i in blacklist) {
        if (message.content.toLowerCase().includes(blacklist[i].toLowerCase())) {
            found = true
            word = blacklist[i]
        } 
    }

    if (found) {
        message.delete()
        if(message.content.startsWith(`${prefix}tag`)) {
            message.channel.send(`${message.author} Just tried to bypass using the ${prefix}tag command, can we get a :clap: in the chat?`)
        }
        message.author.send(`Please refrain from using banned words. \nMessage: ${message.content} \nDetected Word: ${word}`)
        message.author.send(`The word "${word}" is not allowed in ${message.guild.name}`)
        const chan = message.guild.channels.cache.find(c => c.name == 'logs' && c.type == 'text')
        chan.send(`${message.author} said "${word}" in ${message.channel.name}`)
    }


})

Bot.login(process.env.BOT_TOKEN.VALUE);
