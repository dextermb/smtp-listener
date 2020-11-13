const handler = (stream, session, callback) => {
  stream.pipe(process.stdout)
  stream.on('end', callback)
}

module.exports = handler
