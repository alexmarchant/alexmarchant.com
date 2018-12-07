import Command from '../Command'
import Shell from '../Shell'
import { Node, Dir, File } from '../FS'

export default class Ls extends Command {
  name = 'ls'

  execute (shell: Shell) {
    const path = shell.args()[1]
    let node: Node | undefined

    if (path) {
      node = shell.fs.nodeAtPath(path)
    } else {
      node = shell.fs.workingDir
    }

    if (!node) {
      shell.print(`ls: ${path}: No such file or directory`)
      return
    }

    if (node instanceof File) {
      shell.print(path)
      return
    }

    (node as Dir).children.forEach(child => {
      shell.print(child.name)
    })
  }
}
