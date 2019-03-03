const withStatusCode = (statusCode, formatter = null) => {
    if (statusCode < 100 || statusCode > 559) throw new Error('Error, status code out of range.')

    const hasFormatter = typeof formatter === 'function'
    const format = hasFormatter ? formatter : (data) => data

    return (data = null) => {
        const response = { statusCode }
        if (data) response.body = format(data)

        return response
    }
}

module.exports = {
    withStatusCode
}
