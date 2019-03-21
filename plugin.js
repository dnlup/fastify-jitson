const fp = require('fastify-plugin')
const jitson = require('jitson')

function plugin (fastify, options, next) {
  fastify.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
    const parse = jitson(options)
    try {
      const json = parse(body)
      done(null, json)
    } catch (error) {
      error.statusCode = 400
      done(error, undefined)
    }
  })
  next()
}

module.exports = fp(plugin, {
  fastify: '^2.0.0',
  name: 'fastify-jitson'
})
