import Command from '../../struct/Command';
import { MessageEmbed, Message } from 'discord.js';


abstract class PingCommand extends Command {
  constructor() {
    super({
      name: 'ping',
      aliases: ['p'],
      cooldown: 10,
      description: 'Test/Ping Command for the Bot',
    });
  }

  exec(message: Message, /*client: string[]*/) {

    /*
    if (message.author.id !== '578678204890349594') {
      return message.channel.send("You don't have Permissions");
      
    }
    */

    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Pong! ${Date.now() - message.createdTimestamp} MS`)
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp()

    return message.channel.send(embed).then((msg => msg.react("👋")))
  }
}

export default PingCommand;