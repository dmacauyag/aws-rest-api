require('dotenv/config')

const { withStatusCode } = require('../../utils/response.util')
const { createRepository } = require('../../utils/repository.util')

const repository = createRepository(process.env)()
const ok = withStatusCode(200, JSON.stringify)
const notFound = withStatusCode(404)

exports.handler = async (event) => {
  const { id } = event.pathParameters
  const user = await repository.get(id)

  if (!user) return notFound()

  return ok(user)
}
