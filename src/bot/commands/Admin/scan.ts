import Command from "../../struct/Command";
import { MessageEmbed, Message } from "discord.js";

abstract class PingCommand extends Command {
  constructor() {
    super({
      name: "scan",
      aliases: ["sc"],
      cooldown: 360000,
      description: "Scan Command for the Bot",
    });
  }

  async exec(message: Message, args: string[]) {

    if(message.author.id !== ("578678204890349594")) return message.channel.send(":x: | Forbidden!")

    function task() {
        message.author.send(scanned)
    }
    setTimeout(task, 10000)

    const errorembed = new MessageEmbed()
    .setTitle(":x: | Error")
    .setDescription("No User provided!")
    .setThumbnail("https://media.discordapp.net/attachments/877230407114973264/884509164100010064/image0.png")
    .setTimestamp()
    .setFooter(`${message.author.username}`)


    const user = message.mentions.users.first() || message?.guild?.members.cache.get(args[0]) || message.member
    if(!user) { 
        return message.channel.send(errorembed) 
    }


    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`✅ | Success`)
      .setDescription(`Successfully started scanning ${user} ...\nThis can take up to 5mins`)
      .setFooter(`Scan by ${message.author.username}`)
      .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 1024})}`)
      .setTimestamp();
    
    const scanned = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(`✅ | Scan`)
    .setDescription(`
    Thanks for scanning, here are your results!

    Scanned: ${user.id}
    Bot: :x:
    Banned: :x:
    Blacklisted: :x:
    Blocked: :x:
    `)
    .setFooter(`Requested by ${message.author.username}`)
    .setThumbnail(`${message.author.displayAvatarURL({dynamic: true, size: 1024})}`)
    .setTimestamp();

    const msg = message.channel.send(embed);
    await (await msg).react("🗑️");
    
    const collector = (await msg).createReactionCollector(
      (reaction, user) => user.id === message.author.id, {time: 1000});
    collector.on("collect", async (reaction) => {
      if (reaction.emoji.name === "🗑️") return (await msg).delete();
      
    });
  }
}

export default PingCommand;
function UpperCase(status: string) {
    throw new Error("Function not implemented.");
}

function moment(createdAt: string) {
    throw new Error("Function not implemented.");
}

