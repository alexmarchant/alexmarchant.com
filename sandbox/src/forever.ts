import * as forever from 'forever-monitor'

const child = new (forever.Monitor)('dist/server.js', {
  max: 3,
  silent: true,
  args: []
})

child.on('exit', function () {
  console.error('server.js has exited after 3 restarts')
})

child.start()