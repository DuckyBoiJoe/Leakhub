const Discord = require('discord.js')
const Bot = new Discord.Client()
const prefix = '!'
const blacklist = ['nigga', 'nigger', 'nig', 'n i g']
const logson = true

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
    let args = message.content.substring(prefix.length).split(" ")

    if(message.content.startsWith(`${prefix}poll`)) {
        const pollchannel = message.guild.channels.cache.find(c => c.name == 'polls' && c.type == 'text')
        pollchannel.send(args).then(msg => {
            msg.react('👍')
            msg.react('👎')
        })
    }
    if(message.content.startsWith(`${prefix}purge`)) {
        const amount = args[1]
        if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.channel.send(`${message.author} Just tried to purge the channel, can we get a :clap: in the chat?`)
        if(!amount) return message.channel.send('Please give a valid amount of messages to purge.')
        message.channel.bulkDelete(amount)
    }

    if(message.content.startsWith(`${prefix}kick`)) {
        message.delete()
        if(!message.member.permissions.has('KICK_MEMBERS')) return message.channel.send(`${message.author.username} just tried to execute the kick command without permissions, can we get a :clap: in the chat?`)
        const user = message.mentions.members.first()
        if(!user) return message.channel.send('Remember to mention someone.')
        const member = message.guild.member(user)
        if(!member) return message.channel.send('That user is not in the server')
        const stufftosend = args.join(' ').slice(22)
        member.send(`You have been kicked from Leakhub. \nReason: ${stufftosend}`).catch(console.error)
        member.kick(stufftosend)
        message.channel.send(`Successfully kicked ${member.user.username}`)
        if(logson) {
        const chann = message.guild.channels.cache.find(c => c.name == 'logs' && c.type == 'text')
        chann.send(`${message.author} just banned ${member.user.username} \nReason: ${stufftosend}`)
        }
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
        if(logson) {
        const chann = message.guild.channels.cache.find(c => c.name == 'logs' && c.type == 'text')
        chann.send(`${message.author} just banned ${member.user.username} \nReason: ${stufftosend}`)
        }
    }

    if(message.content.startsWith(`${prefix}tag`)) {
        if(!args[1]) return message.channel.send('Please specify a tag.')
        if(args[1].toLowerCase == 'info') {
            message.channel.send('You can get all the rules and info at #rules-info')
        }else{
            message.channel.send(`No tag found for "${args[1]}"`)
        }

    }

    if(message.content.startsWith(`${prefix}togglelogs`)) {
        if(!message.member.permissions.has('MANAGE_CHANNELS')) return message.channel.send(`${message.author} Just Tried To Toggle Logs for Admins, can we get a :clap: in the chat?`)
        if(!args[1]) return message.channel.send('Please choose "on" or "off"')
        const toggle = args[1]
        if(toggle.toLowerCase == 'on') {
            logson = true
            message.channel.send('Successfully toggled logs.')
        }

        if(toggle.toLowerCase == 'off') {
            logson = false
            message.channel.send('Successfully toggled logs.')
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
        if(logson) {
        const chan = message.guild.channels.cache.find(c => c.name == 'logs' && c.type == 'text')
        chan.send(`${message.author} said "${word}" in ${message.channel.name}`)
        }
    }


})

Bot.login(process.env.BOT_TOKEN);
