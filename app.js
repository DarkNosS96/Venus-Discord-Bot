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
const { Client, MessageAttachment } = require('discord.js');

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
						return client.user.setPresence({ game: { name: `${players}/${maxplayers} Players | !helpme`, type: 0 } });
						} else {
							return client.user.setPresence({ game: { name: 'Offline | !helpme', type: 0 } });
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
				return client.user.setActivity(`${players}/${maxplayers} | !helpme`);
			} else {
				return client.user.setActivity(`Offline | !helpme`);
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
	if (message.channel.type === "dm") {
	let channel = client.channels.find("id", "520193075104972810");
	channel.send("[" + message.author.username + "]: " + message.content) //Message from : Message
	}
	
	
	

		let messageArray = message.content.split(" ");
		let cmd = messageArray[0];

		if(cmd === `!ip`){
			return message.channel.send("`195.201.86.252:28416`");
		}
		if(cmd === `!vote`){
			return message.channel.send("https://venusrust.eu/vote");
		}
		if(cmd === `!store`){
			return message.channel.send("https://venusrust.eu/store");
		}
		if(cmd === `!wipe`){
			return message.channel.send("The last wipe was on **Thu 28 Feb **. The next wipe will be on **Thu 7 Mar**. (Around 19:00 CET.)");
		}
		if(cmd === `!steam`){
			return message.channel.send("https://venusrust.eu/steam");
		}
		if(cmd === `!website`){
			return message.channel.send("https://venusrust.eu");
		}
		if(cmd === `!map`){
			return message.channel.send("https://venusrust.eu/map");
		}
		if(cmd === `!aaa`){
			let serverid = client.guilds.get(message.guild.id).id;
			if(serverid === `485171202583691264`){
				return message.channel.send("mplaaaaaaaaa");
			} else {
				return message.channel.send("test test test");
			}
		}
		if(cmd === `!helpme`){
			const embed = new Discord.RichEmbed()
			.setAuthor("Venus Rust Server", "https://i.imgur.com/rzWmJ6X.png")
			.setTitle("Those are all my commands")
			.setColor(0x30bdff)
			.addField("!ip", "Shows the Server's IP.", false)
			.addField("!website", "Shows our Website.", false)
			.addField("!vote", "Shows the website to Vote for our server and earn free gifts.", false)
			.addField("!wipe", "Shows when was the last wipe and when the next wipe will be.", false)
			.addField("!store", "Shows our Store, you can donate to support our server.", false)
			.addField("!steam", "Shows our Steam Group.", false)
			.addField("!map", "Shows the map online.", false)
			.addField("!players", "Shows you the online players one the server.", false)
			message.channel.send({embed});
		}
		
		
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
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "486884114885246987");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
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
			let channel2 = client.channels.find("id", "486886635771002880");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text);
				channel2.send("!com say New suggestion added in our Discord www.venusrust.eu/discord Check it and vote!");
			}
		} else
		if (command === "saysuggestions2") {
		if (message.member.hasPermission("ADMINISTRATOR")) {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "508057785590874132");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
			}
		} else
		if (command === "sayrust") {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "486885181303685138");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
		} else
		if (command === "saypromo") {
			const color = args[0]
			const text = args.slice(0).join(" ");
			let channel = client.channels.find("id", "507339579439972382");
				if (text.length < 1) return message.channel.send("Can not announce nothing");
				channel.send(text)
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
let guild = member.guild; // Reading property `guild` of guildmember object.
let serverid = guild.id;
if(serverid === `485171202583691264`) {
	let info = client.channels.find("name", "📰info");
	let commands = client.channels.find("name", "❗commands");
	let memberTag = member.user.tag;
	let avatar = member.user.displayAvatarURL;
	let channel = member.guild.channels.find("name", '✋welcome');
	if (!channel) return;
		let embed = new Discord.RichEmbed()
		.setAuthor('Hello and welcome to Venus Rust Server')
		.setColor('RANDOM')
		.setThumbnail(avatar)
		.setImage('https://i.imgur.com/z9pih7T.png')
		.setDescription (member + '\n\nNeed help? Check '+ info +' and '+ commands +' or ask a staff member. Do not forget to have fun!')
		.setTimestamp()
		.setFooter("You joined our server ", "https://i.imgur.com/IL2u3LF.png")
		channel.sendEmbed(embed);
	} else {
	let memberTag = member.user.tag;
	let avatar = member.user.displayAvatarURL;
	let rules = client.channels.find("name", "rules");
	let help = client.channels.find("name", "help");
	let channel = member.guild.channels.find("name", 'welcome');
	if (!channel) return;
		let embed = new Discord.RichEmbed()
		.setAuthor("Γεια σου και καλώς ήρθες στον Insomnia’s Squad Server")
		.setColor('RANDOM')
		.setThumbnail(avatar)
		.setDescription (member + '\n\nΜη ξεχάσεις να τσεκάρεις '+ help +' και '+ rules +' ό,τι βοήθεια χρειαστείς ρώτα κάποιον Admin. \nΜη ξεχάσεις να περάσεις καλά κολλητέ!!')
		channel.sendEmbed(embed);
	}
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.login(process.env.BOT_TOKEN);
