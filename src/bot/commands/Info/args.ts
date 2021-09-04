import Command from "../../struct/Command";
import { Message, MessageEmbed } from "discord.js";

abstract class PingCommand extends Command {
  constructor() {
    super({
      name: "args",
      aliases: ["as"],
      cooldown: 60,
      description: "test command from our bot",
    });
  }

  async exec(message: Message, args: string[]) {
    // Error Message
    let errorEmbed = new MessageEmbed()
      .setTitle(":x: | Error")
      .setDescription(
        `${message.author.username} you didn't provided me with an actual Number!`
      )
      .setColor("BLURPLE")
      .setFooter("Example: !args 1234");

    // Check if the input is an number
    if (isNaN(+args[0])) return message.channel.send(errorEmbed);

    // Success Message if it's an number
    let argsEmbed = new MessageEmbed()
      .setTitle(":white_check_mark: | Success")
      .setDescription("Whooa, your number is: " + args)
      .setColor("BLURPLE")
      .setFooter(`Requested by: ${message.author.username}`)
      .setThumbnail(
        `https://cdn.discordapp.com/attachments/867707047091634176/868442632458752000/628284247827939359.png`
      );
    message.channel.send(argsEmbed);
  }
}

export default PingCommand;
