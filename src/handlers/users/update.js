require('dotenv/config')

const { withStatusCode } = require('../../utils/response.util')
const { parseWith } = require('../../utils/request.util')
const { createRepository } = require('../../utils/repository.util')

const repository = createRepository(process.env)()
const ok = withStatusCode(200)
const notFound = withStatusCode(404)
const parseJson = parseWith(JSON.parse)

exports.handler = async (event) => {
  const { body, pathParameters } = event
  const { id } = pathParameters

  const existingUser = await repository.get(id)
  const user = parseJson(body)

  if (!existingUser) {
    return notFound()
  }

  await repository.put(user, id)

  return ok(JSON.stringify(user))
}
