const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
	name: 'profile',
	description: 'Check your profile',
	cooldown: 5,
	aliases: ['p'],
	execute(client, message, args) {
		const profiles = new db.table('profiles')
		const member = message.mentions.members.first() || message.author;
		const userID = member.id + message.guild.id
		const userProfile = profiles.get(`profiles_${userID}`)
		const name = profiles.get(`profiles_${userID}.name`)
		const bal = profiles.get(`profiles_${userID}.money`) || 0
		if(!userProfile) return message.channel.send('Profile not found')
		message.channel.send({ embed: {
			color: "GREEN",
			title: 'Profile',
			description: 'This is your profile',
			fields: [
				{
					name: "Name",
					value: name
				},
				{
					name: "Balance",
					value: bal
				},
				{
					name: "Number on leaderboard",
					value: "Coming soon!"
				}
			]
		}})
	},
}