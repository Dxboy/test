const db = require('quick.db');

module.exports = {
	name: 'balance',
	description: 'Show balance',
	cooldown: 5,
	aliases: ["b", "bal"],
	execute(client, message, args) {
		const profiles = new db.table('profiles')
		const member = message.mentions.users.first() || message.author;
		const test = member.id + message.guild.id;
		const memberProfile = profiles.get(`profiles_${test}`)
		const name = profiles.get(`profiles_${test}.name`)
		const bal = profiles.get(`profiles_${test}.money`) || 0
		if(!memberProfile) return message.channel.send('Profile not found')
		message.reply({ embed: {
			color: "RED",
			author: {
				name: name,
				icon_url: member.avatarURL()
			},
			title: 'Balance',
			description: `Balance: ${bal}`
		}})
	},
};