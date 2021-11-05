import Command from "../../struct/Command";
import { MessageEmbed, Message } from "discord.js";

abstract class PingCommand extends Command {
  constructor() {
    super({
      name: "application",
      aliases: ["acc"],
      description: "accept/deny registration from a User",
    });
  }

  exec(message: Message, args: string[]) {
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
          `${message.author.username} I require some Permissions: **MANAGE_CHANNELS**, **MANAGE_ROLES**, **EMBED_LINKS**, **SEND_MESSAGES**, **MANAGE_MESSAGES**, **VIEW_CHANNEL**`
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

      // Checking the User
      const user = /* message.mentions.users.first() || */ message.guild.members.cache.get(args[0])
      if(!user) return message.channel.send("Please use the ID of the User you would like to message")

      // Delete input when it worked
      message.delete()

      const reason = args.slice(1).join(" ")
      if(!reason) return message.channel.send("No reason provided!");

      const banmessage = new MessageEmbed()
      .setTitle("New Message!")
      .setDescription(`Dear <@${user.id}>, your Profile has been updated!\nUpdated: ${reason}`)
      .setColor("RED")
      .setTimestamp()
      .setFooter(`TH2 Community`)

      
      user.send(banmessage)
    } catch (error) {
      console.log(error);
      message.channel.send(
        "An Error occured, please try again later or contact the Support"
      );
    }
  }
}

export default PingCommand;
