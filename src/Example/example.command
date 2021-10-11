import Command from '../../struct/Command';
import { MessageEmbed, Message } from 'discord.js';

abstract class PingCommand extends Command {
  constructor() {
    super({
      name: '',
      aliases: [''],
      description: '',
    });
  }

  exec(message: Message) {
    try {


    } catch(error) {
      console.log(error)
      message.channel.send("> Error while executing Command, please try again later!")
    }
    
  }
}

export default PingCommand;