import Command from "../../struct/Command";
import { MessageEmbed, Message } from "discord.js";
import fs from "fs"; 

abstract class PingCommand extends Command {
  constructor() {
    super({
      name: "record",
      aliases: ["rec"],
      cooldown: 10,
      description: "Record Command (Voice)",
    });
  }

  async exec(message: Message /*client: string[]*/) {
   message.react("✅")

   const voicechannel = message?.member?.voice.channel;
   if (!voicechannel) return message.channel.send("⚠️ Please join a voice channel first!");

   const connection = await message?.member?.voice.channel.join();
   const receiver = connection?.receiver.createStream(message.member, {
       mode: "pcm",
       end: "silence"
   });

   const writer = receiver?.pipe(fs.createWriteStream(`./recorded-${message.author.username}.pcm`));
   writer.on("finish", () => {
       message?.member?.voice?.channel?.leave();
       message.channel.send("🔊 ✔️ Finished writing audio, saved in Developers Folder.");
     });
  }
}

export default PingCommand;
