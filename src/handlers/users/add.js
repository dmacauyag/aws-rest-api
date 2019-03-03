require('dotenv/config')

const { UsersRepository } = require('../../repositories/users.repository')
const { withStatusCode } = require('../../utils/response.util')
const { parseWith } = require('../../utils/request.util')
const { withProcessEnv } = require('../../dynamodb.factory')

const docClient = withProcessEnv(process.env)()
const repository = new UsersRepository(docClient)
const created = withStatusCode(201)
const parseJson = parseWith(JSON.parse)

exports.handler = async (event) => {
  const { body } = event
  const user = parseJson(body)

  await repository.put(user)

  return created()
}
