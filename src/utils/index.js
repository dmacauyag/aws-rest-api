// Taken from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
const guidGenerator = () => {
    const S4 = () => {
       return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
    return (S4()+S4())
}

module.exports = {
    guidGenerator
}
