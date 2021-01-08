const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
	name: "resetprofile",
	description: "Reset profile",
	cooldown: 5,
	aliases: ["resetp", "reset", 'delete'],
	async execute(client, message, args) {
		const profiles = new db.table('profiles')
		const userID = message.author.id + message.guild.id
		const userProfile = profiles.get(`profiles_${userID}`)

		if(userProfile === null) return message.reply('You don\'t have a profile!')

		const msg = await message.channel.send('Are you sure you want to delete your profile?')
		await msg.react('✅')
		await msg.react('❌')

		const filter = (reaction, user) => {
			return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id + message.guild.id === userID
		}

		msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
			.then(reaction => {
				if(reaction.first().emoji.name === '✅') {
					profiles.delete(`profiles_${userID}`)
					msg.reactions.removeAll()
					return msg.edit('Profile deleted')
				} else if(reaction.first().emoji.name === '❌') {
					msg.reactions.removeAll()
					return msg.edit('Request cancelled')
				}
			})
			.catch(() => {
				return message.reply('Request cancelled because you ran out of time')
			})
	}
}