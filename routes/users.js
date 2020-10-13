const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users')
const auth = require('../middlewares/auth')

router.get('/', auth, UserController.getAll)
router.get('/:id', UserController.getById)
router.post('/', UserController.register)
router.post('/login', UserController.login)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.remove)

module.exports = router