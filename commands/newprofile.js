const db = require('quick.db');
const Discord = require('discord.js');
const { prefix } = require('../config.json')

module.exports = {
	name: "newprofile",
	description: "Create new profile",
	cooldown: 5,
	aliases: ["createprofile", "createp", "newp"],
	execute(client, message, args) {
		const profiles = new db.table('profiles');
		const userId = message.author.id + message.guild.id
		const userProfile = profiles.get(`profiles_${userId}`); //create profile

		if(userProfile) return message.reply("You already have a profile!");

		message.channel.send("Send a message of your profile name"); //ask users to put in the name

		const filter = (user) => {
			return user.author.id + message.guild.id === message.author.id + message.guild.id
		}

		message.channel.awaitMessages(filter, { max: 1, time: 60000, errors: ['time'] })
			.then(collected => {
				const name = collected.first().content
				const regex = !/[^a-zA-Z0-9 ]+/g.test(name) //check if the users put in other char
				
				if(!regex) return message.channel.send("Your name musn't have illegal character") //tells the users they put in other chars

				profiles.set(`profiles_${userId}.name`, name) //set users name

				message.channel.send(`Your profile has been created with the name **${name}**`) //tells user what they set their name
				return message.channel.send(`Use \`${prefix}profile\` to check your profile`)
			})
			.catch(() => {
				return message.channel.send('You have run out of time to specify a name') //tells user they ran out of time
			})
	}
}