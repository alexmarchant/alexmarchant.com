import Command from '../Command'
import Terminal from '../Terminal'

export default class Clear extends Command {
  name = 'clear'

  execute (terminal: Terminal) {
    terminal.clear()
  }
}
