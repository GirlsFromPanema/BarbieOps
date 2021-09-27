import Command from "../../struct/Command";
import { Message, MessageEmbed } from "discord.js";

abstract class SetupCommand extends Command {
  constructor() {
    super({
      name: "setup",
      cooldown: 60,
      aliases: ["s"],
      description: "Setup Environment",
    });
  }

  async exec(message: Message /*args: string[]*/) {
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

      // Process embed with Reaction Collector
      const processembed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL())
        .setColor("BLURPLE")
        .setFooter("Waiting for your reaction! | Canceling in `60` Seconds")
        .setTitle(`⚠️ | Information`)
        .setDescription(
          "Click ✅ to proceed the Setup\n Click ❌ to cancel the Setup"
        );

      const msg = await message.channel.send(processembed);
      setTimeout(() => msg.delete(), 60000);
      //message.channel.send("Didn't received any reaction after 10 seconds!")

      /* Loading Embed removed
    let okembed = new MessageEmbed()
      .setDescription(
        "<:Loading:869268932018704414> started processing the Environment"
      )
      .setColor("BLURPLE")
      .setTimestamp()
      .setFooter(`Done by ${message.author.username}`);
    */

      // Cancel Setup Process if there is already an existing channel called "Developer"
      // @ts-ignore
      let enverror = new MessageEmbed()
        .setTitle(":x: | Error")
        .setDescription(
          `${message.author.username}, seems like your Server already has an Developer Category or Channel set\n\nThe Setup got cancelled to prevent Spaming Server Channels, Categories and Roles\n\nIf you wish to proceed this Setup, delete the Channel or Category called **Developer** and re-run this Command`
        )
        .setColor("RED")
        //.setFooter("")
        .setImage(
          "https://cdn.discordapp.com/attachments/860222821217468436/871476386739675146/e5017b97fecb1abaaacd304d24882905.webp"
        )
        .setTimestamp();

      let done = new MessageEmbed()
        .setTitle("✅ | Success")
        .setDescription("Successfully created the Environment")
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(`Done by ${message.author.username}`);

      let devembed = new MessageEmbed()
        .setTitle("Developer Information")
        .setDescription(
          `I have now created a special Category, Channel and Role where you can use me.\n
    Remember to change custom User Permissions if needed.\n
    **Thanks for using me!❤️**`
        )
        .setImage(
          "https://cdn.discordapp.com/attachments/860222821217468436/871476386739675146/e5017b97fecb1abaaacd304d24882905.webp"
        )
        .setColor("PINK");
      //.setFooter(`Ordered by: ${message.author.username}`)
      //.setTimestamp()

      await msg.react("✅");
      await msg.react("❌");

      const collector = msg.createReactionCollector(
        // @ts-ignore
        (reaction, user) => user.id === message.author.id
      );
      collector.on("collect", async (reaction) => {
        /*
      Deleting the message and cancel the Command when the Author reacts on ❌
      */
        if (reaction.emoji.name === "❌") {
          return msg.delete();
        }

        if (reaction.emoji.name === "✅") {
          msg.delete();

          /*
        @param Checking if any Channel already inclused or has the Name "Developer"
        @param If so, we are canceling the Setup and sending an Error Embed
        @param Very good against Spam, Raids etc - a good security option
        */
          const ch = message.guild?.channels.cache.find(
            (ch) => ch.name === "developer"
          );
          if (ch) return message.channel.send(`${message.author}`);
          // End of security check

          // If everything is fine, the setup finishes and send this Message into the Channel the Setup got activated
          // @ts-ignore
          const successmessage = await message.channel.send(done);
          //setTimeout(() => msg.delete(), 10000);

          // @ts-ignore
          const createrole = await message.guild?.roles.create({
            data: {
              name: "Developers",
              color: "BLUE",
              /*permissionOverwrites: [
              {
                id: message.guild.roles.everyone,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
            ],
            */
            },
          });

          const category = await message.guild?.channels.create("Developers", {
            type: "category",
            permissionOverwrites: [
              {
                id: message.guild.roles.everyone || message.guild.id,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
            ],
          });
          // @ts-ignore
          const channel = await message.guild?.channels
            .create("developer", {
              type: "text",
              parent: category,
              permissionOverwrites: [
                {
                  id: message.guild.roles.everyone || message.guild.id,
                  deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                },
              ],
            })
            .then((channel) => channel.send(devembed));
        }

        await reaction.users.remove(message.author.id);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default SetupCommand;
