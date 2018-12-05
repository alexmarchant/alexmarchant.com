import Command from './Command'
import commands from './commands'
import * as FS from './FS'

export default class Terminal {
  public input = ''
  public output: Array<string> = [
    'Last login: Tue Dec  4 20:49:50 on ttys008'
  ]
  public loading = true
  commandHistory: Array<string> = []
  currentCommandHistoryIndex?: number

  commands: Array<Command> = commands

  async execute () {
    delete this.currentCommandHistoryIndex
    this.print(`> ${this.input}`)

    const parts = this.input.split(' ')
    const commandName = parts[0]

    if (!commandName) {
      this.print('')
      return
    }

    const command = this.commands.find(command => {
      return command.name === commandName
    })

    if (command) {
      await command.execute(this)
    } else {
      this.print(`zsh: command not found: ${commandName}`)
    }

    this.commandHistory.push(this.input)
    this.input = ''
  }

  print (statement: string) {
    this.output.push(statement)
  }

  loadPreviousCommand () {
    if (!this.currentCommandHistoryIndex) {
      this.currentCommandHistoryIndex = this.commandHistory.length
    }

    this.currentCommandHistoryIndex -= 1

    if (this.currentCommandHistoryIndex > this.commandHistory.length) {
      this.currentCommandHistoryIndex = 0
    }

    const previousCommand = this.commandHistory[this.currentCommandHistoryIndex]
    if (previousCommand) {
      this.input = previousCommand
    }
  }

  loadNextCommand () {
    if (!this.currentCommandHistoryIndex) {
      this.currentCommandHistoryIndex = this.commandHistory.length
    }

    this.currentCommandHistoryIndex += 1

    if (this.currentCommandHistoryIndex > this.commandHistory.length) {
      this.currentCommandHistoryIndex = this.commandHistory.length - 1
    }

    const nextCommand = this.commandHistory[this.currentCommandHistoryIndex]
    if (nextCommand) {
      this.input = nextCommand
    }
  }
}
