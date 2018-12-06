import Command from '../Command'
import Terminal from '../Terminal'

export default class Pwd extends Command {
  name = 'pwd'

  execute (terminal: Terminal) {
    const path = terminal.fs.pathForNode(terminal.fs.workingDir)

    if (!path) {
      terminal.print(`pwd: No working directory found`)
      return
    }

    terminal.print(path)
  }
}
