import Event from '../struct/Event';


abstract class ReadyEvent extends Event {
  bot: string[];
  constructor() {
    super({
      name: 'ready',
      once: true,
    });
  }

  async exec() {
    console.log(`✔️ Bot online | MS: ${this.client?.ws.ping}`);
    this.client.user?.setActivity(`{help | barbie.gg`, {type: "PLAYING"})
    //this.client.user?.setStatus("dnd")
  }
}

export default ReadyEvent;