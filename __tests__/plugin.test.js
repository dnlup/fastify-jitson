const test = require('ava')
const fastify = require('fastify')
const plugin = require('../plugin')

test.before(t => {
  t.context.instance = fastify()
  t.context.instance.register(plugin)
  t.context.instance.post('/', function (request, reply) {
    reply.send(request.body)
  })
})

test.cb('initialization works', t => {
  t.context.instance.listen(0, t.end)
})

test('plugin works', async t => {
  const response = await t.context.instance.inject({
    method: 'POST',
    url: '/',
    payload: {
      hello: 'world'
    }
  })
  t.snapshot(response.payload)
})
