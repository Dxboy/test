const db = require('quick.db');

module.exports = {
	name: 'addbalance',
	description: 'Show balance',
	cooldown: 5,
	aliases: ["addb", "addbal"],
	execute(client, message, args) {
		const profiles = new db.table('profiles')
		const member = message.mentions.users.first() || message.author;
		const memberProfile = profiles.get(`profiles_${member.id}`)
		const bal = profiles.get(`profiles_${member.id}.money`) || 0
		if(!memberProfile) return message.channel.send('Profile not found')
		
		if(!args.length) return
		
		if(!message.mentions.users.first()) {
			var input = parseInt(args[0])
			var name = profiles.get(`profiles_${member.id}.name`)
			profiles.add(`profiles_${member.id}.money`, input)
			return message.channel.send(`Added ${input}$ in ${name}\'s balance`)
		} else {
			var input = parseInt(args[1])
			var name = profiles.get(`profiles_${member.id}.name`)
			profiles.add(`profiles_${member.id}.money`, input)
			return message.channel.send(`Added ${input}$ in ${name}\'s balance`)
		}
	},
};