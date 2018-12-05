import Command from '../Command'
import Terminal from '../Terminal'
import * as FS from '../FS'

export default class Cat extends Command {
  name = 'cat'

  async execute (terminal: Terminal) {
    const parts = terminal.input.split(' ')
    const fileName = parts[1]

    if (!fileName) {
      terminal.print('cat: No such file or directory')
      return
    }

    const fileIndex = await FS.index()

    if (!(<any>fileIndex)[fileName]) {
      terminal.print(`cat: ${fileName}: No such file or directory`)
      return
    }

    const content = await FS.getFile(fileName)
    const wrappedContent = `<pre>${content}</pre>`
    terminal.print(wrappedContent)
  }
}
