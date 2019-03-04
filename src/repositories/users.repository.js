const { guidGenerator } = require('../utils/index')

class UsersRepository {
    get _baseParams () {
        return {
            TableName: this._tableName
        }
    }

    constructor (documentClient, tableName) {
        this._documentClient = documentClient
        this._tableName = tableName
    }

    async list () {
        const params = this._createParamObject()
        const response = await this._documentClient.scan(params).promise()

        return response.Items || []
    }

    async get (id) {
        const params = this._createParamObject({ Key: { id } })
        const response = await this._documentClient.get(params).promise()

        return response.Item
    }

    async put (user) {
        const params = this._createParamObject({ Item: user })
        await this._documentClient.put(params).promise()
    
        return user
    }

    async post (user) {
        const userObject = { id: guidGenerator(), lastUpdated: Date.now(), ...user }
        const params = this._createParamObject({ Item: userObject })
        await this._documentClient.put(params).promise()

        return user
    }
    
    async delete (id) {
        const params = this._createParamObject({ Key: { id } })
        await this._documentClient.delete(params).promise()

        return id
    }

    _createParamObject (additionalArgs = {}) {
        return { ...this._baseParams, ...additionalArgs }
    }
}

exports.UsersRepository = UsersRepository
