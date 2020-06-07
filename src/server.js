const express = require("express")
const nunjucks = require("nunjucks")
const server = express()
const router = require('./routes')

server.use(express.static('public'))
server.use(express.urlencoded( {extended: true}))
server.use(router)

nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})
server.set("view engine", "njk")

server.listen(3000)
