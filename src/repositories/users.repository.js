class UsersRepository {
    get _baseParams () {
        return {
            TableName: 'users'
        }
    }

    constructor (documentClient) {
        this._documentClient = documentClient
    }

    async list () {
        const params = this._createParamObject()
        const response = await this._documentClient.scan(params).promise()

        return response.Items || []
    }

    async put (user) {
        const params = this._createParamObject({ Item: user })
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