/**
 * Local or server running
 */
const server = require("./interfaces/http/server")

const { start } = server()

start().catch((error) => {
    console.log(error)
    process.exit()
})
