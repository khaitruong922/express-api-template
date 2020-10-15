const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users')
const auth = require('../middlewares/auth')

router.get('/', auth, UserController.getAll)
router.get('/:id', auth, UserController.getById)
router.put('/:id', auth, UserController.update)
router.delete('/:id', auth, UserController.remove)

module.exports = router