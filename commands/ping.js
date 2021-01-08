module.exports = {
	name: 'ping',
	description: 'Ping!',
	cooldown: 5,
	execute(client, message, args) {
		var latency = Date.now() - message.createdTimestamp;
		message.channel.send(`Pong! Your bot ping is ${latency}ms`)
	},
};