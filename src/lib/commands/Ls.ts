import Command from '../Command'
import Terminal from '../Terminal'
import * as FS from '../FS'

export default class Ls extends Command {
  name = 'ls'

  async execute (terminal: Terminal): Promise<void> {
    Object.keys(await FS.index()).forEach(fileName => {
      terminal.print(fileName)
    })
  }
}
