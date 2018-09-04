const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `!ip`){
    return message.channel.send("**The SHIELD Rust Server was closed.**");
  }
  if(cmd === `!vote`){
    return message.channel.send("**The SHIELD Rust Server was closed.**");
  }
  if(cmd === `!website`){
    return message.channel.send("**The SHIELD Rust Server was closed.**");
  }
  if(cmd === `!wipe`){
    return message.channel.send("**The SHIELD Rust Server was closed.**");
  }
  if(cmd === `!steam`){
    return message.channel.send("**The SHIELD Rust Server was closed.**");
  }
  
});

bot.login(process.env.BOT_TOKEN);
