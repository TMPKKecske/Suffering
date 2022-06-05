module.exports = 
{ 
    execute(message)
    { 
        console.log("/help command was used.");
        message.channel.send("**Általános parancsok**\n`/rang` => Megmutatja hányas szintű a rangod. *Használat:* `/rang`\n`/toplista` => Megmutatja az első 10 legnagyobb szintű embert. *Használat:* `/toplista`\n**Admin parancsok:**\n`/xp` => XP-t tudsz adni embereknek. *Használat:* `/xp @valaki 34`\n`/szint` Ezzel msáknak be tudsz állítani szintet. *Használat:* `/szint @valaki 34`");
    }
}