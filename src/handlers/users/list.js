require('dotenv/config')

const { UsersRepository } = require('../../repositories/users.repository')
const { withStatusCode } = require('../../utils/response.util')
const { withProcessEnv } = require('../../dynamodb.factory')

const docClient = withProcessEnv(process.env)()
const repository = new UsersRepository(docClient)
const ok = withStatusCode(200, JSON.stringify)

exports.handler = async (event) => {
  const users = await repository.list()

  return ok(users)
}
