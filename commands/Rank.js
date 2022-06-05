module.exports = 
{
    async execute(message, Levels, client)
    {       
        const { MessageEmbed } = require('discord.js');

        const target = message.mentions.users.first() || message.author; 

        const user = await Levels.fetch(target.id, message.guild.id);     

        if (!user) 
        {
            var Message;           

            if(message.mentions.users.first() === null)
            {
                Message = "hmm úgy látszik még nem kaptál xp-t.";
            }
            else 
            {
                Message = `hmm úgy látszik még nem kapott ${ message.mentions.users.first().username} xp-t.`;
            }

            const NoRangEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(Message)

            return message.channel.send(NoRangEmbed);
        }

        //message.channel.send(`**${target.tag}**, a szinted: **${user.level}.**, és **${user.xp}/${Levels.xpFor(user.level + 1)}** XP van meg a következő ranghoz!`);

        

        const Loadbar = 
        [
            "░░░░░░░░░░░░░░░░░░░░", 
            "█░░░░░░░░░░░░░░░░░░░", 
            "██░░░░░░░░░░░░░░░░░░", 
            "███░░░░░░░░░░░░░░░░░", 
            "█████░░░░░░░░░░░░░░░", 
            "██████░░░░░░░░░░░░░░", 
            "███████░░░░░░░░░░░░░", 
            "████████░░░░░░░░░░░░", 
            "█████████░░░░░░░░░░░", 
            "██████████░░░░░░░░░░", 
            "███████████░░░░░░░░░", 
            "████████████░░░░░░░░",
            "█████████████░░░░░░░",
            "██████████████░░░░░░",
            "███████████████░░░░░",
            "████████████████░░░░",
            "█████████████████░░░",
            "██████████████████░░",
            "███████████████████░",
            "████████████████████",
        ]

        var AllUsersCount = await Levels.AllUsersCount(message.guild.id); 
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, AllUsersCount);
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, false); 

        const RangEmbed = new MessageEmbed()
	        .setColor('#0099ff')
	        //.setTitle(`${target.username} a szinted: **${user.level}**`)	  
            .setThumbnail(target.avatarURL())      
	        .setAuthor(target.username, message.guild.iconURL(), 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')            
	        .setDescription(`A szinted: **${user.level}.** \n${Loadbar[Math.floor(map(user.xp, [Levels.xpFor(user.level),Levels.xpFor(user.level + 1)], [0, 19]))]}\n**${user.xp}**/**${Levels.xpFor(user.level + 1)}** XP\nRangod a szerveren: **#${leaderboard.indexOf(leaderboard.find(element => element.userID === target.id)) + 1}**`)

        const RangEmbed2 = new MessageEmbed()
	        .setColor('#0099ff')
	        //.setTitle(`${target.username} a szinted: **${user.level}**`)	  
            .setThumbnail(target.avatarURL())      
	        .setAuthor(target.username, message.guild.iconURL(), 'https://www.youtube.com/watch?v=dQw4w9WgXcQ')            
	        .setDescription(`A szintje: **${user.level}.** \n${Loadbar[Math.floor(map(user.xp, [Levels.xpFor(user.level),Levels.xpFor(user.level + 1)], [0, 19]))]}\n**${user.xp}**/**${Levels.xpFor(user.level + 1)}** XP\nRangja a szerveren: **#${leaderboard.indexOf(leaderboard.find(element => element.userID === target.id)) + 1}**`)


        if (message.mentions.users.first() === undefined) 
        {
            message.channel.send(RangEmbed);   
        }
        else 
        {
            message.channel.send(RangEmbed2);   
        }
        
            
        console.log("/rank command was used");        
    }
}


function map (value, oldRange, newRange) {
    var newValue = (value - oldRange[0]) * (newRange[1] - newRange[0]) / (oldRange[1] - oldRange[0]) + newRange[0];
    return Math.min(Math.max(newValue, newRange[0]) , newRange[1]);
}