import Command from '../Command'
import Terminal from '../Terminal'
import { Node, Dir, File } from '../FS'

export default class Ls extends Command {
  name = 'cd'

  execute (terminal: Terminal) {
    const parts = terminal.input.split(' ')
    const path = parts[1]

    if (!path) {
      terminal.print(`cd: no such file or directory`)
      return
    }

    const node = terminal.fs.nodeAtPath(path)
    if (!node) {
      terminal.print(`cd: ${path}: No such file or directory`)
      return
    }

    if (node instanceof File) {
      terminal.print(`cd: not a directory: ${path}`)
      return
    }

    terminal.fs.workingDir = node
  }
}
