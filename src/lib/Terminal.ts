import Command from './Command'
import commands from './commands'
import FS, { Dir, File } from './FS'
import contactHTML from '../assets/contact.html'
import workHTML from '../assets/work.html'

export default class Terminal {
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

    this.commandHistory.push(this.input)
    this.input = ''
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

  private setupFS () {
    const binDir = new Dir()
    commands.forEach(command => {
      binDir.children[command.name] = new File('')
    })

    this.fs.rootDir.children = {
      home: new Dir({
        alex: new Dir({
          'contact.html': new File(contactHTML),
          'work.html': new File(workHTML)
        })
      }),
      bin: binDir
    }

    const alex = this.fs.nodeAtPath('/home/alex')! as Dir
    this.fs.workingDir = alex
    this.fs.homeDir = alex
  }
}
