import Command from '../Command'
import Terminal from '../Terminal'
import { Node, Dir, File } from '../FS'

export default class Ls extends Command {
  name = 'ls'

  execute (terminal: Terminal) {
    const parts = terminal.input.split(' ')
    const path = parts[1]
    let node: Node | undefined

    if (path) {
      node = terminal.fs.nodeAtPath(path)
    } else {
      node = terminal.fs.workingDir
    }

    if (!node) {
      terminal.print(`ls: ${path}: No such file or directory`)
      return
    }

    if (node instanceof File) {
      terminal.print(path)
      return
    }

    Object.keys((node as Dir).children).forEach(name => {
      terminal.print(name)
    })
  }
}
