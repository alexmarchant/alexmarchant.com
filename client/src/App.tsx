import React from 'react'
import './App.css'
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { AttachAddon } from 'xterm-addon-attach'
import { FitAddon } from 'xterm-addon-fit'

const HTTP_BASE = document.location.href.includes('localhost') ? 'http://localhost:3002' : 'https://api.alexmarchant.com'
const WS_BASE = HTTP_BASE.replace('http', 'ws')

export default class App extends React.Component<{}, {}> {
  terminalElement: React.RefObject<HTMLDivElement>

  constructor(props: {}) {
    super(props)
    this.terminalElement = React.createRef()
  }

  componentDidMount() {
    this.connectToTerminal()
  }

  async connectToTerminal() {
    const pid = await this.createTerminal()
    const terminal = new Terminal({
      theme: {
        background: '#212121',
        foreground: '#cfcfc1',
        black: '#212121',
        red: '#f82a71',
        green: '#a6e12d',
        yellow: '#fd971e',
        blue: '#ae80fe',
        magenta: '#f82a71',
        cyan: '#66d8ee',
        white: '#cfcfc1',
        brightBlack: '#74705d',
        brightRed: '#f82a71',
        brightGreen: '#a6e12d',
        brightYellow: '#e6db73',
        brightBlue: '#ae80fe',
        brightMagenta: '#f82a71',
        brightCyan: '#66d8ee',
        brightWhite: '#f7f7f1',
      },
      fontSize: 12,
      fontFamily: 'Roboto Mono, monospace'
    })
    const fitAddon = new FitAddon()
    const url = `${WS_BASE}/terminals/${pid}`
    const socket = new WebSocket(url)
    const attachAddon = new AttachAddon(socket)
    terminal.loadAddon(fitAddon)
    terminal.loadAddon(attachAddon)
    terminal.open(this.terminalElement.current!)
    terminal.focus()
    fitAddon.fit()
  }

  async createTerminal(): Promise<string> {
    const res = await fetch(`${HTTP_BASE}/terminals`, { method: 'POST' })
    return res.text()
  }

  render() {
    return (
      <div className="App">
        <div className="App-terminal-container">
          <div className="App-terminal" ref={this.terminalElement}></div>
        </div>
      </div>
    )
  }
}
