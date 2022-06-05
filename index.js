const Levels = require("discord.js-leveling");
const Discord = require('discord.js');
const clientToken = "tokenlolol";
const leaderboard = require('./commands/Leaderboard');
const WelcomeChannelID = "929099204234715187";

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const prefix = '/';
const rank = require('./commands/Rank');
const AddXP = require('./commands/AddXP');
const AddLevel = require('./commands/AddLevel');
const Help = require('./commands/Help');
let rankaddingmessageid = ""; 
const Mod = 'Rendszergarázda'; 

Levels.setURL("mongodb+srv://usermaneherelolol:passwordddddherelolol@cluster0.knzcl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"); //mongodb+srv://00Gery00:00Gery00@cluster0.ttksi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const SavedDataJson =  require('./SavedData.json');
const { debug } = require("console");

client.on("message", async (message) => 
{
  if (message.guild === null && !message.author.bot) 
  {
    fs = require('fs');
    let data = JSON.parse(fs.readFileSync("SavedData.json").toString());   
    if (!data.SavedMinecraftDiscordConstacts.find(object => object.DC === message.author.id)) //havanrangja
    {
      var NewPlayer = {"DC":message.author.id, "Minecraft": message.content.split(" ").join("") };
      data.SavedMinecraftDiscordConstacts.push(NewPlayer);
      fs.writeFileSync('SavedData.json', JSON.stringify(data));

      let rank;
      
      if (client.guilds.cache.find(g => g.name === "Nagy Lajos minecraft szerver").members.cache.find(member => member.user.username === message.author.username).roles.cache.find(r => r.name === "Lajosista")) 
      {
        rank = "lajosista";
      } 
      else if (client.guilds.cache.find(g => g.name === "Nagy Lajos minecraft szerver").members.cache.find(member => member.user.username === message.author.username).roles.cache.find(r => r.name === "Babits")) 
      {
        rank = "babits";
      } 
      else if (client.guilds.cache.find(g => g.name === "Nagy Lajos minecraft szerver").members.cache.find(member => member.user.username === message.author.username).roles.cache.find(r => r.name === "Leőwey")) 
      {
        rank = "lőwey";
      } 
      else if (client.guilds.cache.find(g => g.name === "Nagy Lajos minecraft szerver").members.cache.find(member => member.user.username === message.author.username).roles.cache.find(r => r.name === "Szent Mór")) 
      {
        rank = "szent-mór";
      } 
      else if (client.guilds.cache.find(g => g.name === "Nagy Lajos minecraft szerver").members.cache.find(member => member.user.username === message.author.username).roles.cache.find(r => r.name === "Zipernowsky")) 
      {
        rank = "zipernowsky";
      } 
      else if (client.guilds.cache.find(g => g.name === "Nagy Lajos minecraft szerver").members.cache.find(member => member.user.username === message.author.username).roles.cache.find(r => r.name === "Janus")) 
      {
        rank = "janus";
      } 
      else if (client.guilds.cache.find(g => g.name === "Nagy Lajos minecraft szerver").members.cache.find(member => member.user.username === message.author.username).roles.cache.find(r => r.name === "Koch-Valéria")) 
      {
        rank = "kock-valera";
      }

      const { exec } = require('child_process');
      exec(`./GiveRank.sh ${NewPlayer.Minecraft} ${rank}`, (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err)
        }
        else {
        console.log(`Parancs végrehajtva: ${stdout}`);
        }
      });

      const Embed = new Discord.MessageEmbed()
      .setTitle('Rangod meg lett adva a minecraft szerveren!') 
      .setImage('https://images-na.ssl-images-amazon.com/images/I/418cEZfh8-L.jpg')
      .setDescription('Ha nem ezt a rangot szeretted volna akkor a reakciódat vondd vissza a rang választó üzenten!')
      message.reply(Embed);
    }
  }
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  
  if(command === 'rangadas')
  {
    const exampleEmbed = new Discord.MessageEmbed()
    .setTitle('Iskolai rangok:') 
    .setImage('https://pcdn.hu/articles/images-sm/i/s/k/iskola-jelentkezes-onkentes-tanulo-diak-suli-429126.jpg')
    .setDescription('Milyen iskolába jársz? Válassz rá egy rangot!\nHa <@&966722763127664702> vagy akkor nyomd meg a 🏠 gombot.\nHa <@&966722896754012210>-is vagy akkor nyomd meg a 🇱 gombot.\nHa <@&966723082213548164>-os vagy akkor nyomd meg a 🇸 gombot.\n Ha <@&968895503364390922>-ból jöttél nyomd meg a 🇰 gombot.\nHa  <@&967405374082805780>-os vagy nyomd meg a 🇧 gombot.\n Ha <@&968559754098122752>-s vagy nyomd meg a 🇿 gombot. \n Ha <@&982944254643032154>-os vagy nyomd meg a 🇯 gombot.')
  
    fs = require('fs');
    let data = JSON.parse(fs.readFileSync("SavedData.json").toString());

    message.channel.send(exampleEmbed).then(embed => {
      embed.react('🏠')
      embed.react('🇱')
      embed.react('🇸')
      embed.react('🇰')
      embed.react('🇧')
      embed.react('🇿')
      embed.react('🇯')
      data.RankAddingMessageId = embed.id;
      fs.writeFileSync('SavedData.json', JSON.stringify(data));
    });
  }

});


client.on("message", async (message) => {
    if (!message.guild) return;
    if (message.author.bot) return;    
    if(message.guild === null) {return;};
    console.log("Someone sent a message!");
    
    var randomAmountOfXp;

    const generateRandomNumber = (min, max) =>  
    {
        return Math.floor(Math.random() * (max - min) + min);
    };   
        
   if (message.member.roles.cache.some(role => role.name === '+25% xp boost')) 
   {
        randomAmountOfXp = generateRandomNumber(10, 20)
        console.log("+25%");
   }   
   else if (message.member.roles.cache.some(role => role.name === '+50% xp boost')) 
   {    
      randomAmountOfXp = generateRandomNumber(12, 24) 
      console.log("+50%");
   }
   else if (message.member.roles.cache.some(role => role.name === '+100% xp boost')) 
   {    
      randomAmountOfXp = generateRandomNumber(16, 32) 
      console.log("+100%");
   }
   else if (message.member.roles.cache.some(role => role.name === '+150% xp boost')) 
   {    
      randomAmountOfXp = generateRandomNumber(20, 40) 
      console.log("+150%");
   }
   else if (message.member.roles.cache.some(role => role.name === '+200% xp boost')) 
   {    
      randomAmountOfXp = generateRandomNumber(24, 48) 
      console.log("+200%");
   }
   else if (message.member.roles.cache.some(role => role.name === '+300% xp boost')) 
   {    
      randomAmountOfXp = generateRandomNumber(32, 64) 
      console.log("+300%");
   }
   else 
   {
      randomAmountOfXp =  generateRandomNumber(8, 16)
   }

   const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
  
   if(hasLeveledUp) {
      
          const user = await Levels.fetch(message.author.id, message.guild.id);
          
    	   const levelEmbed = new Discord.MessageEmbed()
      	        .setTitle('Nagyobb szintet értél el!')
                .setDescription(`**Gratulálunk!** ${message.author}, elérted a **${user.level}.** szintet!\n`)
             	.setThumbnail(message.author.avatarURL())     

    	  const sendEmbed = await message.channel.send(levelEmbed)

          console.log(`>${message.author.username} leveled up to: ${user.level} `);

          const rank5 = message.guild.roles.cache.find(r => r.name === "5. Szintű beszélő"); // ezt nevezd át lol
          const rank10 = message.guild.roles.cache.find(r => r.name === "10. Szintű beszélő");
          const rank15 = message.guild.roles.cache.find(r => r.name === "15. Szintű beszélő");
          const rank20 = message.guild.roles.cache.find(r => r.name === "20. Szintű beszélő");
          const rank35 = message.guild.roles.cache.find(r => r.name === "25. Szintű beszélő");
          const rank40 = message.guild.roles.cache.find(r => r.name === "30. Szintű beszélő");
          const rank45 = message.guild.roles.cache.find(r => r.name === "35. Szintű beszélő");
          const rank55 = message.guild.roles.cache.find(r => r.name === "40. Szintű beszélő");
          const rank65 = message.guild.roles.cache.find(r => r.name === "45. Szintű beszélő");
          const rank60 = message.guild.roles.cache.find(r => r.name === "50. Szintű beszélő");

          if (user.level === 5) 
          {
            message.member.roles.add(rank5);
            message.member.roles.remove(rank10);
            message.member.roles.remove(rank15);
            message.member.roles.remove(rank20);
            message.member.roles.remove(rank35);
            message.member.roles.remove(rank40);
            message.member.roles.remove(rank45);
            message.member.roles.remove(rank55);
            message.member.roles.remove(rank65);
            message.member.roles.remove(rank60);
          }else if (user.level === 10)
          {
            message.member.roles.add(rank10);
            message.member.roles.remove(rank5);
            message.member.roles.remove(rank15);
            message.member.roles.remove(rank20);
            message.member.roles.remove(rank35);
            message.member.roles.remove(rank40);
            message.member.roles.remove(rank45);
            message.member.roles.remove(rank55);
            message.member.roles.remove(rank65);
            message.member.roles.remove(rank60);
          }
          else if (user.level === 15) 
          {
            message.member.roles.add(rank15);
            message.member.roles.remove(rank5);
            message.member.roles.remove(rank10);
            message.member.roles.remove(rank20);
            message.member.roles.remove(rank35);
            message.member.roles.remove(rank40);
            message.member.roles.remove(rank45);
            message.member.roles.remove(rank55);
            message.member.roles.remove(rank65);
            message.member.roles.remove(rank60);
          }
          else if (user.level === 20) 
          {
            message.member.roles.add(rank20);
            message.member.roles.remove(rank5);
            message.member.roles.remove(rank10);
            message.member.roles.remove(rank15);
            message.member.roles.remove(rank35);
            message.member.roles.remove(rank40);
            message.member.roles.remove(rank45);
            message.member.roles.remove(rank55);
            message.member.roles.remove(rank65);
            message.member.roles.remove(rank60);
          }
          else if (user.level === 25) 
          {
            message.member.roles.add(rank35);
            message.member.roles.remove(rank5);
            message.member.roles.remove(rank10);
            message.member.roles.remove(rank15);
            message.member.roles.remove(rank20);
            message.member.roles.remove(rank40);
            message.member.roles.remove(rank45);
            message.member.roles.remove(rank55);
            message.member.roles.remove(rank65);
            message.member.roles.remove(rank60);
          }
          else if (user.level === 30) 
          {
            message.member.roles.add(rank40);
            message.member.roles.remove(rank5);
            message.member.roles.remove(rank10);
            message.member.roles.remove(rank15);
            message.member.roles.remove(rank20);
            message.member.roles.remove(rank35);
            message.member.roles.remove(rank45);
            message.member.roles.remove(rank55);
            message.member.roles.remove(rank65);
            message.member.roles.remove(rank60);
          }
          else if (user.level === 35) 
          {
            message.member.roles.add(rank45);
            message.member.roles.remove(rank5);
            message.member.roles.remove(rank10);
            message.member.roles.remove(rank15);
            message.member.roles.remove(rank20);
            message.member.roles.remove(rank35);
            message.member.roles.remove(rank40); 
            message.member.roles.remove(rank55);
            message.member.roles.remove(rank65);
            message.member.roles.remove(rank60);
          }
          else if (user.level === 40) 
          {
            message.member.roles.add(rank55);
            message.member.roles.remove(rank5);
            message.member.roles.remove(rank10);
            message.member.roles.remove(rank15);
            message.member.roles.remove(rank20);
            message.member.roles.remove(rank35);
            message.member.roles.remove(rank40);
            message.member.roles.remove(rank45);
            message.member.roles.remove(rank65);
            message.member.roles.remove(rank60);
          }
          else if (user.level === 45) 
          {
            message.member.roles.add(rank65);
            message.member.roles.remove(rank5);
            message.member.roles.remove(rank10);
            message.member.roles.remove(rank15);
            message.member.roles.remove(rank20);
            message.member.roles.remove(rank35);
            message.member.roles.remove(rank40);
            message.member.roles.remove(rank45);
            message.member.roles.remove(rank55);
            message.member.roles.remove(rank60);
          }
          else if (user.level === 50) 
          {
            message.member.roles.add(rank60);
            message.member.roles.remove(rank5);
            message.member.roles.remove(rank10);
            message.member.roles.remove(rank15);
            message.member.roles.remove(rank20);
            message.member.roles.remove(rank35);
            message.member.roles.remove(rank40);
            message.member.roles.remove(rank45);
            message.member.roles.remove(rank55);        
          }
      }
  });

    client.on('message', message =>{
    if(message.guild === null) {return;};
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'rang'){
        rank.execute(message, Levels, client); 
    }else if (command === 'toplista') 
    {
        leaderboard.execute(message, Levels, client, args[0]);
    }else if (command === 'szint') 
    {       
      if (!message.member.roles.cache.some(role => role.name === Mod)) 
      {
        message.reply(`Nincs jogosultságod ezt a parancsot használni.`);
        return;
      }
        if (args.length > 1) 
        {            
            amogus();
            async function amogus() 
            {
                
                const good = await AddLevel.execute(message.guild.id, args, Levels, message.author, message);

                if (good) 
                {
                    message.channel.send(`**${args[0]}** szintje **${args[1]}.** lett.`);
                }
                else 
                {
                    message.reply(`Valamit elírtál a parancs használatakor, használd a \`/help\` parancsot hogy megtudd, hogy kell.`);
                }
                
            } 
        }  
        else 
        {
            message.reply(`Valamit elírtál a parancs használatakor, használd a \`/help\` parancsot hogy megtudd, hogy kell.`);
        }
    }else if (command === 'xp') 
    {   
      if (!message.member.roles.cache.some(role => role.name === Mod)) 
      {
        message.reply(`Nincs jogosultságod ezt a parancsot használni.`);
        return;
      }
        if (args.length > 1) 
        {  
            sugoma();
            async function sugoma() 
            {            
                const good = await AddXP.execute(message.guild.id, args, Levels, message.author);
    
                if (good) 
                {
                    message.channel.send(`**${args[0]}** xp-je **${args[1]}**-vel több lett.`);
                }
                else 
                {
                    message.reply(`Valamit elírtál a parancs használatakor, használd a \`/help\` parancsot hogy megtudd, hogy kell.`);
                }                
            } 
        }
        else 
        {
            message.reply(`Valamit elírtál a parancs használatakor, használd a \`/help\` parancsot hogy megtudd, hogy kell.`);
        }
    }else if (command === 'segítség') 
    {
      Help.execute(message);
    }
});

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const url = "https://minecraft-api.com/api/ping/online/crnlgserver.ddns.net/25565";

var playersOnline;

async function RefeshServerStatus() 
{
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);      
    xhr.onload = () => 
        {        
            try 
            {
              if (xhr.responseText.length > 1) 
                {
                  client.user.setActivity("A szerver offline.");
                }
                else                 
                {
                  playersOnline = xhr.responseText;
                  client.user.setActivity(playersOnline + "/100");
                }

            }
            catch(error)
            {
              console.log(error);
            }
        };
    xhr.send();

} 

client.on('ready', () => 
{
    console.log("The bot is ready. It is name is: " + client.user.tag);
    setInterval(() => { RefeshServerStatus() }, 20000);
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(c => c.id === WelcomeChannelID)
  channel.send("Üdvüzlünk a **Nagy Lajos minecraft szerverén **" + member.user.toString() + "! Érezd jól magad és olvasd el a **szabályokat**!"); 
  if (member.bot) return;
  const newbieRole = member.guild.roles.cache.find(role => role.name === 'Tag')  
  member.roles.add(newbieRole.id)
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.cache.find(c => c.id === WelcomeChannelID)
  channel.send("**" + member.displayName + "** távozott a szerverről. Várunk vissza!"); 
});

let StartedAdding = true;
client.on('messageReactionAdd', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial
	if (reaction.partial) {
		// If the message this reaction belongs to was removed, the fetching might result in an API error which should be handled
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}

  if (reaction.me && !StartedAdding) { return }
  else 
  {
    StartedAdding = false;
    console.log("sugoma");
  };

  let userReacTimes = 0;   
  reaction.message.reactions.cache.forEach(reaction => {
    if (reaction.users.cache.find(u => u.id === user.id)) 
    {
      userReacTimes++;
    }
  });

  if (userReacTimes > 1) 
  {
    reaction.users.remove(user.id);
    removedbybot = true;
    return;
  }
  console.log("sus");
 
  fs = require('fs');
  let data = JSON.parse(fs.readFileSync("SavedData.json").toString());
  if (reaction.message.id === data.RankAddingMessageId) 
  {
    console.log("amongus");
    if (reaction.emoji.name === "🏠") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name === "Lajosista")      
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.add(role);  
      const lajos = new Discord.MessageEmbed()
        .setTitle('Megkaprad a discord szereveren a Lajosista rangot!') 
        .setImage('https://i.ytimg.com/vi/w9ephgFRRtg/maxresdefault.jpg')
        .setDescription('Írd le a **Minecraft felhasználóneved**, hogy a Minecrafton belül is kapj rangot!')
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send(lajos); 
    }
    else if (reaction.emoji.name === "🇱") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name === "Leőwey")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.add(role);
      const löwe = new Discord.MessageEmbed()
        .setTitle('Megkaprad a discord szereveren a Leöwey-es rangot!') 
        .setImage('https://live.staticflickr.com/5696/20856322080_f15bcf8ac4_b.jpg')
        .setDescription('Írd le a **Minecraft felhasználóneved**, hogy a Minecrafton belül is kapj rangot!')
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send(löwe);        
    } 
    else if (reaction.emoji.name === "🇸") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name === "Szent Mór")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.add(role);
      const szent = new Discord.MessageEmbed()
      .setTitle('Megkaprad a discord szereveren a Szent Mór-os rangot!') 
      .setImage('https://pecsiegyhazmegye.hu/images/2016/_kozneveles/szent-mor-iskolakozpont-eletkepek-web-20160111-26.jpg')
      .setDescription('Írd le a **Minecraft felhasználóneved**, hogy a Minecrafton belül is kapj rangot!')
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send(szent);   
    } 
    else if (reaction.emoji.name === "🇰") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name ===  "Koch-Valéria")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.add(role);
      const szent = new Discord.MessageEmbed()
      .setTitle('Megkaprad a discord szereveren a Koch-Valéria rangot!') 
      .setImage('https://cdn.discordapp.com/attachments/971064817056100383/983104369841012757/your_mom.jpg')
      .setDescription('Írd le a **Minecraft felhasználóneved**, hogy a Minecrafton belül is kapj rangot!')
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send(szent);   
    } 
    else if (reaction.emoji.name === "🇧") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name === "Babits")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.add(role);
      const embed = new Discord.MessageEmbed()
      .setTitle('Megkaprad a discord szereveren a Babits rangot!') 
      .setImage('https://www.pecsma.hu/wp-content/uploads/2013/10/Babits_Gimnazium.jpg')
      .setDescription('Írd le a **Minecraft felhasználóneved**, hogy a Minecrafton belül is kapj rangot!')
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send(embed);   
    } 
    else if (reaction.emoji.name === "🇿") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name ===  "Zipernowsky")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.add(role);
      const embed = new Discord.MessageEmbed()
      .setTitle('Megkaprad a discord szereveren a Zipernowsky rangot!') 
      .setImage('https://pecsiszc.hu/images/slides/slide5.jpg')
      .setDescription('Írd le a **Minecraft felhasználóneved**, hogy a Minecrafton belül is kapj rangot!')
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send(embed);   
    } 
    else if (reaction.emoji.name === "🇯") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name === "Janus")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.add(role);
      const embed = new Discord.MessageEmbed()
      .setTitle('Megkaprad a discord szereveren a Janus-os rangot!')
      .setImage('https://www.pecsma.hu/wp-content/uploads/2018/02/janus-gimn%C3%A1zium-hl04.jpg')
      .setDescription('Írd le a **Minecraft felhasználóneved**, hogy a Minecrafton belül is kapj rangot!')
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send(embed);   
    } 
    else 
    {
      return;
    }
  }


});

let removedbybot = false;
let StartedRemoving = true;
client.on('messageReactionRemove', async (reaction, user) => {
	// When a reaction is received, check if the structure is partial  
	if (reaction.partial) {	
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
	}

  if (removedbybot) 
  {
    removedbybot = false;
    console.log("removed by bot as ym idiot program thinks");
    return;
  }
  else 
  {
    console.log("no");
  }
  
  fs = require('fs');
  let data = JSON.parse(fs.readFileSync("SavedData.json").toString());  
  let rank;
  if (reaction.message.id === data.RankAddingMessageId) 
  {
    if (reaction.me && !StartedRemoving) { return }
    else 
    {
      StartedRemoving = false;
    };

    if (reaction.emoji.name === "🏠") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name === "Lajosista")      
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.remove(role);     
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.remove("Rangod el lett törölve!"); 
      rank = "lajosista";
    }
    else if (reaction.emoji.name === "🇱") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name === "Leőwey")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.remove(role);
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send("Rangod el lett törölve!");   
      rank = "lőwey";     
    } 
    else if (reaction.emoji.name === "🇸") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name === "Szent Mór")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.remove(role);
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send("Rangod el lett törölve!");   
      rank = "szent-mór";
    } 
    else if (reaction.emoji.name === "🇰") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name ===  "Koch-Valéria")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.remove(role);
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send("Rangod el lett törölve!");   
      rank = "kock-valera";
    } 
    else if (reaction.emoji.name === "🇧") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name === "Babits")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.remove(role);
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send("Rangod el lett törölve!");   
      rank = "babits";
    } 
    else if (reaction.emoji.name === "🇿") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name ===  "Zipernowsky")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.remove(role);
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send("Rangod el lett törölve!");   
      rank = "zipernowsky";
    } 
    else if (reaction.emoji.name === "🇯") 
    {
      var role = reaction.message.channel.guild.roles.cache.find(role => role.name === "Janus")
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).roles.remove(role);
      reaction.message.channel.guild.members.cache.find(member => member.user.username  == user.username).user.send("Rangod el lett törölve!");   
      rank = "janus";
    } 
    else 
    {
      return;
    }

    if (data.SavedMinecraftDiscordConstacts.find(o => o.DC === user.id)) 
    {
      console.log("Found");
      const { exec } = require('child_process');

      exec(`./RemoveRank.sh ${data.SavedMinecraftDiscordConstacts.find(o => o.DC === user.id).Minecraft} ${rank}`, (err, stdout, stderr) => {
        if (err) {
          //some err occurred
          console.error(err)
        }
        else {
        console.log(`Parancs végrehajtva: ${stdout}`);
        }})
        data.SavedMinecraftDiscordConstacts.splice(data.SavedMinecraftDiscordConstacts.indexOf(data.SavedMinecraftDiscordConstacts.find(o => o.DC === user.id)), 1);  
        fs.writeFileSync('SavedData.json', JSON.stringify(data));
    }
  }

});

client.login(clientToken);
