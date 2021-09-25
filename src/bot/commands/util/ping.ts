import Command from "../../struct/Command";
import { MessageEmbed, Message } from "discord.js";

abstract class PingCommand extends Command {
  constructor() {
    super({
      name: "ping",
      aliases: ["p"],
      cooldown: 10,
      description: "Test/Ping Command for the Bot",
    });
  }

  async exec(message: Message /*client: string[]*/) {
   // message.delete();

  

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Pong!`)
      .setDescription(`${Date.now() - message.createdTimestamp} MS`)
      .setFooter(`Requested by ${message.author.username}`)
      .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 1024})}`)
      .setTimestamp();
    
    const refreshed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`Pong!`)
    .setDescription(`Refreshed Ping: ${Date.now() - message.createdTimestamp} MS`)
    .setFooter(`Requested by ${message.author.username}`)
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 1024})}`)
    .setTimestamp();

    const msg = message.channel.send(embed);
    await (await msg).react("🗑️");
    await (await msg).react("🔄")

    const collector = (await msg).createReactionCollector(
      (reaction, user) => user.id === message.author.id
    );
    collector.on("collect", async (reaction) => {
      if (reaction.emoji.name === "🗑️") return (await msg).delete();
      console.log(`Successfully deleted Ping Reply`)

      if(reaction.emoji.name === "🔄") return message.channel.send(refreshed)
    });
  }
}

export default PingCommand;
