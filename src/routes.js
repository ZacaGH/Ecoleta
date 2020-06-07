const express = require('express')
const routes = express.Router()
const db = require('./config/db')
const controller = require("./controllers/main")

routes.get("/", controller.index)

routes.get("/create-point", controller.createPoint)

routes.post("/savepoint", controller.savePoint)

routes.get("/search", controller.search)

module.exports = routes