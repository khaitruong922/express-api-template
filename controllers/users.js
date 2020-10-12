const express = require('express')
const router = express.Router()
const User = require('../models/user')
router.get('/', (req, res) => {
    User.find().then((users) => {
        res.send(users)
    })
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    const filter = { _id: id }
    User.findOne(filter).then((user) => {
        console.log(user)
        res.send(user)
    })
})
router.post('/', (req, res, next) => {
    User.create(req.body).then((user) => {
        res.send(user)
    }).catch(next)
})
router.put('/:id', (req, res) => {
    const id = req.params.id
    const filter = { _id: id }
    User.findByIdAndUpdate(filter, req.body).then((user) => {
        User.findOne(filter).then((user) => {
            res.send(user)
        })
    })
})
router.delete('/:id', (req, res) => {
    const id = req.params.id
    const filter = { _id: id }
    User.findByIdAndRemove(filter).then((user) => {
        res.send(user)
    })
})

module.exports = router