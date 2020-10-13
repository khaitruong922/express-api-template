const express = require('express')
const router = express.Router()
const UserController = require('../controllers/users')

router.get('/', UserController.getAll)
router.get('/:id', UserController.getById)
router.post('/', UserController.add)
router.put('/:id', UserController.update)
router.delete('/:id', UserController.remove)

module.exports = router