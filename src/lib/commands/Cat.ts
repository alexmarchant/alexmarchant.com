import Command from '../Command'
import Terminal from '../Terminal'
import { Dir, File } from '../FS'

export default class Cat extends Command {
  name = 'cat'

  execute (terminal: Terminal) {
    const parts = terminal.input.split(' ')
    const path = parts[1]

    if (!path) {
      terminal.print('cat: No such file or directory')
      return
    }

    const node = terminal.fs.nodeAtPath(path)
    if (!node) {
      terminal.print(`cat: ${path}: No such file or directory`)
      return
    }

    if (node instanceof Dir) {
      terminal.print(`cat: ${path}: Is a directory`)
      return
    }

    terminal.print((node as File).contents)
  }
}
