import Command from '../Command'
import Terminal from '../Terminal'

export default class Pwd extends Command {
  name = 'pwd'

  async execute (terminal: Terminal) {
    terminal.print('~/')
    return Promise.resolve()
  }
}
