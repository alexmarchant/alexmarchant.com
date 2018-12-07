import * as cowsay from 'cowsay'
import Command from '../Command'
import Shell from '../Shell'

export default class Cowsay extends Command {
  name = 'cowsay'

  execute (shell: Shell) {
    const text = shell.args().slice(1).join(' ')
    const output = cowsay.say({ text })
    shell.print(`<pre>${output}</pre>`)
  }
}
