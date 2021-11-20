import Command from "../../struct/Command";
import { MessageEmbed, Message } from "discord.js";

abstract class JoinCommand extends Command {
  constructor() {
    super({
      name: "join",
      aliases: ["j"],
      description: "Let the Bot join your VC",
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
          `${message.author.username} I require some Permissions: **MANAGE_CHANNELS**, **JOIN_VOICECHANNEL**, **EMBED_LINKS**, **SEND_MESSAGES**, **MANAGE_MESSAGES**, **VIEW_CHANNEL**`
        )
        .setColor("RED")
        .setTimestamp();

      // User Permissions
      if (!message.member?.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(errormember);
      }

      // Check Bot Permissions
      if (
        !message.guild?.me?.hasPermission([
          "MANAGE_CHANNELS",
          "EMBED_LINKS",
          "SEND_MESSAGES",
          "MANAGE_MESSAGES",
          "VIEW_CHANNEL",
        ])
      ) {
        return message.channel.send(botpermserror);
      }
        const connection = await message.member?.voice.channel?.join();
        
        const voicechannel = message.member?.voice.channel;
        if(!voicechannel) return message.channel.send(`${message.author.username} You are not in a Voice Channel`)
        const embed = new MessageEmbed()
        .setTitle(`:loudspeaker: | Joined ${voicechannel.name}`)
        .setColor("GREEN")
        .setTimestamp();
        message.channel.send(embed);
  
    } catch (error) {
      console.log(error);
      message.channel.send(
        "An Error occured, please try again later or contact the Support"
      );
    }
  }
}

export default JoinCommand;
