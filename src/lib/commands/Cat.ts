import Command from '../Command'
import Shell from '../Shell'
import { Dir, File } from '../FS'

export default class Cat extends Command {
  name = 'cat'

  execute (shell: Shell) {
    const path = shell.args()[1]

    if (!path) {
      shell.print('cat: No such file or directory')
      return
    }

    const node = shell.fs.nodeAtPath(path)
    if (!node) {
      shell.print(`cat: ${path}: No such file or directory`)
      return
    }

    if (node instanceof Dir) {
      shell.print(`cat: ${path}: Is a directory`)
      return
    }

    shell.print((node as File).contents)
  }
}
