import Command from '../Command'
import Shell from '../Shell'

export default class Pwd extends Command {
  name = 'pwd'

  execute (shell: Shell) {
    const path = shell.fs.pathForNode(shell.fs.workingDir)

    if (!path) {
      shell.print(`pwd: No working directory found`)
      return
    }

    shell.print(path)
  }
}
