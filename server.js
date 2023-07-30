const http = require("http")
// const chalk = require("chalk")
const app = require("./app")

const PORT = 3000
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(
    ("Server is listening on PORT:"),
    (PORT),
    ("Get your routine on!")
  )
})
