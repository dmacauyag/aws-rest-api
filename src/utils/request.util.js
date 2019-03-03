const parseWith = (parser) => (text) => {
    if (!parser) throw new Error('Error, missing parser function')
    if (!text) throw new Error('Error, missing text')

    return parser(text)
}

module.exports = {
    parseWith
}
