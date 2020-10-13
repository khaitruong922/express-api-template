const express = require('express')
const router = express.Router()
const UsersRoute = require('./users')
router.use("/users", UsersRoute)

module.exports = router