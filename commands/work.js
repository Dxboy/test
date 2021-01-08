const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
	name: 'work',
	description: 'Go to work',
	cooldown: 5,
	aliases: ['w'],
	async execute(client, message, args) {
		var maxAmount = '100'; //max amount of money they can get
		var output = Math.floor(Math.random()*maxAmount);
		const profiles = new db.table('profiles')
		const userID = message.author.id + message.guild.id;
		const userProfiles = profiles.get(`profiles_${userID}`)

		if(!userProfiles) return message.reply('lol')
		profiles.add(`profiles_${userID}.money`, output)

		message.channel.send(`Worked for ${output}`)
	}
}