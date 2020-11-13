const SMTP = require('smtp-server').SMTPServer
const hook = require('./hook')

const server = new SMTP({
  name: process.env.HOSTNAME,
  onAuth: hook.authenticate,
  onConnect: hook.connect,
  onClose: hook.disconnect,
  onData: hook.data,
  onMailFrom: hook.from,
  onRcptTo: hook.to
})

const port = process.env.PORT

server.listen(port, () => {
  console.log(`> SMTP server listening on port ${port}`)
})

server.on('error', hook.error)
