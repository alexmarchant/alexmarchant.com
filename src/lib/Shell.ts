import Command from './Command'
import commands from './commands'
import FS, { Dir, File } from './FS'
import contactHTML from '../assets/contact.html'
import workHTML from '../assets/work.html'

export default class Shell {
  public input = ''
  public output: Array<string> = []
  public loading = true
  public fs = new FS()

  commandHistory: Array<string> = []
  currentCommandHistoryIndex?: number

  constructor () {
    this.setupFS()
  }

  execute () {
    delete this.currentCommandHistoryIndex
    this.print(`> ${this.input}`)

    const commandArg = this.args()[0]
    if (!commandArg) {
      this.print('')
      this.resetInput()
      return
    }

    const command = commands.find(command => {
      return command.name === commandArg
    })

    if (command) {
      command.execute(this)
    } else {
      this.print(`zsh: command not found: ${commandArg}`)
    }

    this.resetInput()
  }

  print (statement: string) {
    this.output.push(statement)
  }

  clear () {
    this.output = []
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

  args (): Array<string> {
    return this.input.split(' ')
  }

  private resetInput () {
    this.commandHistory.push(this.input)
    this.input = ''
  }

  private setupFS () {
    const home = new Dir('home')
    this.fs.rootDir.addChild(home)
    const alex = new Dir('alex')
    home.addChild(alex)
    alex.addChild(new File('contact.html', contactHTML))
    alex.addChild(new File('work.html', workHTML))
    const bin = new Dir('bin')
    this.fs.rootDir.addChild(bin)
    commands.forEach(command => {
      bin.addChild(new File(command.name, ''))
    })

    this.fs.workingDir = alex
    this.fs.homeDir = alex
  }
}
