import * as cowsay from 'cowsay'
import Command from '../Command'
import Terminal from '../Terminal'

export default class Cowsay extends Command {
  name = 'cowsay'

  execute (terminal: Terminal) {
    const text = terminal.args().slice(1).join(' ')
    const output = cowsay.say({ text })
    terminal.print(`<pre>${output}</pre>`)
  }
}
