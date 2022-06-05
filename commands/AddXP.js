module.exports = 
{ 
    async execute(GuildID, args, Levels)
    {         
        if ((args[0].match(/\d/g) === null)) {return false}
        const userID = args[0].match(/\d/g).join("");
        //const user = await Levels.fetch(userID, GuildID);  
        //if (!user) {Levels.createUser(userID, GuildID);}
        Levels.appendXp(userID, GuildID, args[1]);
        console.log("/XP command was used.");
        return true;  
    }
}