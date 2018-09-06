const Discord = require("discord.js");
const request = require('request');
const config = require("./config.json");
const rcon = require("./rcon/app.js");
const debug = process.env.debug || config.debug;
const apiUrl = process.env.apiUrl || config.apiUrl; 
const apiSite = process.env.apiSite || config.apiSite;
const enableRcon = process.env.enableRcon || config.enableRcon;
const prefix = process.env.prefix || config.prefix;
const roles = process.env.roles || config.roles;

var updateInterval = (1000 * 60) * 6;

const client = new Discord.Client();

function updateActivity() {
	if(apiSite == 1) {
		require("tls").DEFAULT_ECDH_CURVE = "auto"
		request({ url: apiUrl, headers: { json: true, Referer: 'discord-rustserverstatus' }, timeout: 10000 }, function(err, res, body)
		{
		if (!err && res.statusCode == 200){
			const server = JSON.parse(body);
			const is_online = server.status;
				if(is_online == "Online") {
					const players = server.players;
					const maxplayers = server.players_max;
						if(debug) console.log("Updated rust-servers.info");
						return client.user.setPresence({ game: { name: `${players}/${maxplayers} | !help`, type: 0 } });
						} else {
							return client.user.setPresence({ game: { name: 'Offline', type: 0 } });
						}
		}
		});
  }
 if(apiSite == 2) {
    request({ url: apiUrl, headers: { Referer: 'discord-rustserverstatus' }, timeout: 10000 }, function(error, response, body)
    {
	if (!error && response.statusCode == 200){
        const server = JSON.parse(body);
        const is_online = server.is_online;
        if(is_online == 1) {
			const players = server.players;
			const maxplayers = server.maxplayers;
			if(debug) console.log("Updated rust-servers.net");
			return client.user.setActivity(`${players}/${maxplayers}`);
			} else {
				return client.user.setActivity("Offline");
			}
		}
    });
}
}

client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
	updateActivity();
	setInterval(function () {
    updateActivity();
	}, updateInterval);
});

if (enableRcon == 1)
	{
    client.on("message", async message => {

      if(message.author.bot) return;
      if(message.content.indexOf(prefix) !== 0) return;
    
      var args = message.content.slice(prefix.length).trim().split(/ +/g);
      var command = args.shift().toLowerCase();
    
    if(command === "rcon") {
      // Checks for discord permission
      if(!message.member.roles.some(r=>roles.includes(r.name)) )
        return message.reply("Sorry, you don't have permissions to use this!");
    
      var getMessage = args.join(" ");
      
      // Rcon message.
      argumentString = `${getMessage}`;
      
      // Rcon Config
      rconhost = (process.env.rconhost);
      rconport = (process.env.rconport);
      rconpass = (process.env.rconpass);
      
      // Run rcon command.
      rcon.RconApp(argumentString, rconhost, rconport,rconpass, debug);
      
      // Send message back to discord that we are trying to relay the command.
      message.channel.send(`Trying to relay command: ${getMessage}`);
      }
    });
  }
  else if (debug) console.log("Rcon mode disabled")

  
  
  
  
client.on("message", async message => {
	if(message.author.bot) return;
		if(message.channel.type === "dm") return;

		let messageArray = message.content.split(" ");
		let cmd = messageArray[0];

		if(cmd === `!ip`){
			return message.channel.send("`client.connect 195.201.86.252:28416`");
		}
		if(cmd === `!vote`){
			return message.channel.send("https://rust-servers.net/server/145824/");
		}
		if(cmd === `!website`){
			return message.channel.send("Our website is not ready yet...");
		}
		if(cmd === `!wipe`){
			return message.channel.send("The last wipe was on Fri 31 Aug. The next wipe will be on Wed 5 Sep. (Weekly Wipes)");
		}
		if(cmd === `!steam`){
			return message.channel.send("https://steamcommunity.com/groups/Venus-Rust");
		}
		if(cmd === `!help`){
		
		
			const embed = new Discord.RichEmbed()
			.setAuthor("Venus Rust Server", "https://i.imgur.com/rzWmJ6X.png")
			.setTitle("Those are all my commands")
			.setColor(0x30bdff)
			.addField("!ip", "Shows the Server's IP.", true)
			.addField("!vote", "Shows the website to vote for our server.", true)
			.addField("!wipe", "Shows when was the last wipe and when the next wipe will be.", true)
			.addField("!website", "Shows our website.", true)
			.addField("!steam", "Shows our Steam Group.", true)
			.addField("!players", "Shows you the online players one the server.", true)
			message.channel.send({embed});
		}
	});
		
		
		let command = message.content.split(" ")[0];
		command = command.slice(prefix.length);
		let args = message.content.split(" ").slice(1);
		if (command === "saywelcome") {
			if (message.member.hasPermission("ADMINISTRATOR")) {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "486884048514449408");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
			}
		} else
		if (command === "sayinfo") {
			if (message.member.hasPermission("ADMINISTRATOR")) {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "486884087475470337");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
			}
		} else
		if (command === "saycommands") {
			if (message.member.hasPermission("ADMINISTRATOR")) {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "486884105661972480");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
			}
		} else
		if (command === "saynews") {
			if (message.member.hasPermission("ADMINISTRATOR")) {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "486884114885246987");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
			}
		} else
		if (command === "saygeneral") {
			if (message.member.hasPermission("ADMINISTRATOR")) {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "486884137006006285");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
			}
		} else
		if (command === "saysuggestions") {
		if (message.member.hasPermission("ADMINISTRATOR")) {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "486884158589894669");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
			}
		} else
		if (command === "sayrust") {
			if (message.member.hasPermission("ADMINISTRATOR")) {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "486885181303685138");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
			}
		} else
		if (command === "sayall") {
		if (message.member.hasPermission("ADMINISTRATOR")) {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "486884137006006285");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send("@everyone")
				channel.send(text)
			}
		} else
		if (command === "sayadmin") {
			if (message.member.hasPermission("ADMINISTRATOR")) {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "485176392921645087");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send("@everyone")
				channel.send(text)
			}
		} else
		if (command === "photos") {
			if (message.member.hasPermission("ADMINISTRATOR")) {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "486884171101241354");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
			}
		}	
});


client.on("guildMemberAdd", (member) => {
let info = member.guild.channels.find("name", '📰info');
let commands = member.guild.channels.find("name", '❗commands');
let guild = member.guild; // Reading property `guild` of guildmember object.
let memberTag = member.user.tag;
let avatar = member.user.displayAvatarURL;
let channel = member.guild.channels.find("name", '✋welcome');
  if (!channel) return;
    let embed = new Discord.RichEmbed()
    .setAuthor('Hello and welcome to Venus Rust Server')
  	.setColor('RANDOM')
    .setThumbnail(avatar)
    .setImage('https://i.imgur.com/z9pih7T.png')
  	.setDescription (member + '\n\nNeed help? Check ' + info + ' and ' + commands + ' or ask a staff member. Do not forget to have fun!')
    .setTimestamp()
    .setFooter("You joined out server ", "https://i.imgur.com/IL2u3LF.png")
    channel.sendEmbed(embed);
});














client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.login(process.env.BOT_TOKEN);
