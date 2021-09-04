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

    // code 
  }
}

export default PingCommand;