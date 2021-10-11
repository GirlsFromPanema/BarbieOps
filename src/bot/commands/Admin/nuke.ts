import Command from '../../struct/Command';
import { MessageEmbed, Message } from 'discord.js';

abstract class PingCommand extends Command {
  constructor() {
    super({
      name: 'nuke',
      aliases: ['n'],
      description: 'Nuke a Channel!',
    });
  }

  async exec(message: Message, args: string[]) {
    try {

        let errormember = new MessageEmbed()
        .setTitle(":x: | Error")
        .setDescription(
          `${message.author.username} You require **Administrator** Permissions to run this Command`
        )
        .setColor("RED")
        .setTimestamp();

      let botpermserror = new MessageEmbed()
        .setTitle(":x: | Error")
        .setDescription(
          `${message.author.username} I require Permissions: **MANAGE_CHANNELS**, **MANAGE_ROLES**, **EMBED_LINKS**, **SEND_MESSAGES**, **MANAGE_MESSAGES**, **VIEW_CHANNEL**`
        )
        .setColor("RED")
        .setTimestamp();

      // Check User Permissions and delete the input (!setup *)
      if (!message.member?.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(errormember);
      }
      message.delete(); //*

      // Check Bots Permissions:
      if (
        !message.guild?.me?.hasPermission([
          "MANAGE_CHANNELS",
          "MANAGE_ROLES",
          "EMBED_LINKS",
          "SEND_MESSAGES",
          "MANAGE_MESSAGES",
          "VIEW_CHANNEL",
        ])
      ) {
        return message.channel.send(botpermserror);
      }
   
      message.channel.delete()

    }catch(error) {
        console.log(error)
        message.channel.send("> Something weird happened, try again later!")
    }

  }
}

export default PingCommand;