module.exports = 
{
    async execute(message, Levels, client, arg)
    { 
        const { MessageEmbed } = require('discord.js');

        var rawLeaderboard;

        if (arg === undefined) 
        {
            rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
            if (rawLeaderboard.length < 1) return message.reply("Senki nincs még a szerver toplistájában. Legyél te az első!");
        }
        else 
        {            
            rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, arg);
            if (rawLeaderboard.length < 1) return message.reply("Senki nincs még a szerver toplistájában. Legyél te az első!");
            if (arg > rawLeaderboard.length) return message.reply("Nincs ennyi ember a toplistán.");
            console.log( rawLeaderboard.length, arg);
            
        } 
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); 

        const lb = leaderboard.map(e => `**${e.position}. ${e.username}**\nSzint: ${e.level}\nXP: ${e.xp.toLocaleString()}\n`); 

        const Leaderboard = new MessageEmbed()
	        .setColor('#0099ff')
	        //.setTitle(`${target.username} a szinted: **${user.level}**`)	  
            .setThumbnail(message.guild.iconURL())      
	        .setAuthor(message.guild.name, message.guild.iconURL(), 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')
	        .setDescription(lb)        
     
        message.channel.send(Leaderboard);       
    }
}