import Command from '../../struct/Command';
import { MessageEmbed, Message } from 'discord.js';

abstract class InfoCommand extends Command {
  constructor() {
    super({
      name: 'info',
      aliases: ['i'],
      cooldown: 60,
      description: 'Test/Ping Command for the Bot',
    });
  }

  async exec(message: Message) {

    if(!message.member?.hasPermission("ADMINISTRATOR")) {
      message.channel.send("❌ | No Permissions, Admin is required")
      return;
    }
    message.delete()
    
    let infoembed = new MessageEmbed()
    .setTitle("Information")
    .setDescription("This is currently under Maintenance")
    .setColor("BLURPLE")
    .setImage(`https://www.quarrylifeaward.de/sites/default/files/media/maintenance-1151312_1280.png`)
    .setFooter("Coming soon | ")
    .setTimestamp()
    
    return message.channel.send(infoembed)
   
    
  }
}

export default InfoCommand;