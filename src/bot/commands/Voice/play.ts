
import Command from "../../struct/Command";
import { MessageEmbed, Message } from "discord.js";
import fs from "fs"; 

abstract class PingCommand extends Command {
  constructor() {
    super({
      name: "play",
      aliases: ["p"],
      cooldown: 60,
      description: "Play Record Command (Voice)",
    });
  }

  async exec(message: Message /*client: string[]*/) {
   // message.delete();

  
   const voicechannel = message?.member?.voice.channel;
   if (!voicechannel) return message.channel.send(`
   ➔ Please join a Voice Channel to start the record and run the command again!\n
   ➔ Due to privacy reasons, only the ID of the authors gets saved.\n
   ➔ Abusing/Spam is strictly forbidden and is a reason for a ban.\n
   `);

   if (!fs.existsSync(`./recorded-${message.author.id}.pcm`)) return message.channel.send(`
   ⚠️ You have not recorded any Audio yet, please run {record\n
   🔇 Make sure you have a working Mic!
   `);

   const connection = await message.member.voice.channel.join();
   const stream = fs.createReadStream(`./recorded-${message.author.id}.pcm`);

   const dispatcher = connection.play(stream, {
       type: "converted"
   });

   dispatcher.on("finish", () => {
       message?.member?.voice?.channel?.leave();
       return message.channel.send(`
       ✅ Finished recording Voice Audio, run play-audio\n
       🚫 Content is only available until the next recording.`);
   })
  }
}

export default PingCommand;
