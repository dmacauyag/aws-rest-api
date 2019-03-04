const { UsersRepository } = require('../repositories/users.repository')
const { withProcessEnv } = require('../dynamodb.factory')

const createRepository = (env) => {
  const docClient = withProcessEnv(env)()

  return (tableName) => new UsersRepository(docClient, tableName || env.USERS_TABLE)
}

module.exports = {
  createRepository
}
