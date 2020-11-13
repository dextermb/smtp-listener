const SMTP = require('smtp-server').SMTPServer
const hook = require('./hook')

const opts = {
  name: process.env.HOSTNAME,
  onAuth: hook.authenticate,
  onConnect: hook.connect,
  onClose: hook.disconnect,
  onData: hook.data,
  onMailFrom: hook.from,
  onRcptTo: hook.to
}

const key = process.env.KEY_PATH
const cert = process.env.CERT_PATH

if (key && cert) {
  const fs = require('fs')

  opts.secure = true
  opts.key = fs.readFileSync(key)
  opts.cert = fs.readFileSync(cert)
}

const server = new SMTP(opts)
const port = process.env.PORT

server.listen(port, () => {
  console.log(`> SMTP server listening on port ${port}`)
})

server.on('error', hook.error)
