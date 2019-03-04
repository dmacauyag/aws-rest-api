require('dotenv/config')

const { UsersRepository } = require('../../repositories/users.repository')
const { withStatusCode } = require('../../utils/response.util')
const { parseWith } = require('../../utils/request.util')
const { withProcessEnv } = require('../../dynamodb.factory')

const docClient = withProcessEnv(process.env)()
const repository = new UsersRepository(docClient)
const ok = withStatusCode(200)
const badRequest = withStatusCode(400)
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

  if (existingUser.id !== user.id) {
    return badRequest()
  }

  await repository.put(JSON.stringify(user))

  return ok(user)
}
