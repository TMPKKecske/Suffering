module.exports = 
{ 
    async execute(GuildID, args, Levels, message)
    { 
        if ((args[0].match(/\d/g) === null)) {return false}
        const userID = args[0].match(/\d/g).join("");
        var amongus = await Levels.fetch(args[0].match(/\d/g).join(""), GuildID);
        if (!amongus) { await Levels.createUser(userID, GuildID);}
        Levels.setLevel(userID, GuildID, args[1]);
        console.log("/addlevel command was used.");
        return true;  
    }
}