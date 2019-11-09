import * as express from 'express'
import * as expressWs from 'express-ws'
import * as pty from 'node-pty'
import * as ws from 'ws'
import * as cors from 'cors'

var app = express() as unknown as expressWs.Application
app.use(cors())
expressWs(app)

var terminals: { [key: string]: pty.IPty } = {}
var logs: { [key: string]: string } = {}

app.post('/terminals', (req, res) => {
  const env = Object.assign({}, process.env)
  env['COLORTERM'] = 'truecolor'
  var cols = parseInt(req.query.cols),
      rows = parseInt(req.query.rows),
      term = pty.spawn('bash', [], {
        name: 'xterm-256color',
        cols: cols || 80,
        rows: rows || 24,
        cwd: env.PWD,
        env: env,
        encoding: null
      })

  console.log('Created terminal with PID: ' + term.pid)
  terminals[term.pid] = term
  logs[term.pid] = ''
  term.on('data', function(data) {
    logs[term.pid] += data
  })
  res.send(term.pid.toString())
  res.end()
})

app.post('/terminals/:pid/size', (req, res) => {
  var pid = parseInt(req.params.pid),
      cols = parseInt(req.query.cols),
      rows = parseInt(req.query.rows),
      term = terminals[pid]

  term.resize(cols, rows)
  console.log('Resized terminal ' + pid + ' to ' + cols + ' cols and ' + rows + ' rows.')
  res.end()
})

app.ws('/terminals/:pid', function (ws, req) {
  var term = terminals[parseInt(req.params.pid)]
  console.log('Connected to terminal ' + term.pid)
  ws.send(logs[term.pid])

  // binary message buffering
  function bufferUtf8(socket: ws, timeout: number): (data: Uint8Array) => void {
    let buffer: Uint8Array[] = []
    let sender: NodeJS.Timeout = null
    let length = 0
    return (data: Uint8Array) => {
      buffer.push(data)
      length += data.length
      if (!sender) {
        sender = setTimeout(() => {
          socket.send(Buffer.concat(buffer, length))
          buffer = []
          sender = null
          length = 0
        }, timeout)
      }
    }
  }
  const send = bufferUtf8(ws, 5)

  term.on('data', (data) => {
    try {
      send(data as any)
    } catch (ex) {
      // The WebSocket is not open, ignore
    }
  })
  ws.on('message', (msg) => {
    term.write(msg as string)
  })
  ws.on('close', () => {
    term.kill()
    console.log('Closed terminal ' + term.pid)
    // Clean things up
    delete terminals[term.pid]
    delete logs[term.pid]
  })
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log('App listening to http://localhost:' + port))