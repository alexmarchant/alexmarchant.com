import React from 'react'
import './App.css'
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { AttachAddon } from 'xterm-addon-attach'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'

const HTTP_BASE = document.location.href.includes('localhost') ? 'http://localhost:3002' : 'https://api.alexmarchant.com'
const WS_BASE = HTTP_BASE.replace('http', 'ws')

export default class App extends React.Component<{}, {}> {
  terminalElement: React.RefObject<HTMLDivElement>
  fitAddon!: FitAddon
  attachAddon!: AttachAddon
  pid!: string
  socket!: WebSocket
  terminal!: Terminal

  constructor(props: {}) {
    super(props)
    this.terminalElement = React.createRef()
  }

  componentDidMount() {
    this.connectToTerminal()
    window.addEventListener('resize', () => {
      this.fit()
    })
  }

  async connectToTerminal() {
    this.pid = await this.createTerminal()
    this.terminal = new Terminal({
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
    this.fitAddon = new FitAddon()
    this.socket = new WebSocket(this.wsURL)
    this.attachAddon = new AttachAddon(this.socket)
    this.terminal.loadAddon(this.fitAddon)
    this.terminal.loadAddon(this.attachAddon)
    this.terminal.loadAddon(new WebLinksAddon())
    this.terminal.open(this.terminalElement.current!)
    this.terminal.focus()
    await this.fit()
  }

  async createTerminal(): Promise<string> {
    const res = await fetch(`${HTTP_BASE}/terminals`, { method: 'POST' })
    return res.text()
  }

  async fit() {
    this.fitAddon.fit()
    const url = `${this.httpURL}/size?cols=${this.terminal.cols}&rows=${this.terminal.rows}`
    await fetch(url, { method: 'POST' })
  }

  get wsURL() {
    return `${WS_BASE}/terminals/${this.pid}`
  }

  get httpURL() {
    return `${HTTP_BASE}/terminals/${this.pid}`
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
