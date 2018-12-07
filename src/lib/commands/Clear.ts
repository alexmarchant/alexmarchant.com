import Command from '../Command'
import Shell from '../Shell'

export default class Clear extends Command {
  name = 'clear'

  execute (shell: Shell) {
    shell.clear()
  }
}
