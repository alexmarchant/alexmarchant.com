import * as cowsay from 'cowsay'
import Command from '../Command'
import Terminal from '../Terminal'

export default class Cowsay extends Command {
  name = 'cowsay'

  async execute (terminal: Terminal) {
    const parts = terminal.input.split(' ')
    const text = parts.slice(1, parts.length).join(' ')
    const output = cowsay.say({ text })
    terminal.print(`<pre>${output}</pre>`)
    return Promise.resolve()
  }
}
