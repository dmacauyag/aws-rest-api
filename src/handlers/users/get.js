require('dotenv/config')

const { UsersRepository } = require('../../repositories/users.repository')
const { withStatusCode } = require('../../utils/response.util')
const { withProcessEnv } = require('../../dynamodb.factory')

const docClient = withProcessEnv(process.env)()
const repository = new UsersRepository(docClient)
const ok = withStatusCode(200, JSON.stringify)
const notFound = withStatusCode(404)

exports.handler = async (event) => {
  const { id } = event.pathParameters
  const user = await repository.get(id)

  if (!user) return notFound()

  return ok(user)
}
