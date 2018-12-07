import Command from '../Command'
import Shell from '../Shell'
import { Node, Dir, File } from '../FS'

export default class Ls extends Command {
  name = 'cd'

  execute (shell: Shell) {
    const path = shell.args()[1]

    if (!path) {
      shell.print(`cd: no such file or directory`)
      return
    }

    const node = shell.fs.nodeAtPath(path)
    if (!node) {
      shell.print(`cd: ${path}: No such file or directory`)
      return
    }

    if (node instanceof File) {
      shell.print(`cd: not a directory: ${path}`)
      return
    }

    shell.fs.workingDir = node as Dir
  }
}
