const express = require('express')
const User = require('../models/user')

// Add these lines above your function if you want to have params suggestions
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
function getAll(req, res, next) {
    User.find().then((users) => {
        res.send(users)
    })
}

function getById(req, res, next) {
    const id = req.params.id
    const filter = { _id: id }
    User.findOne(filter).then((user) => {
        console.log(user)
        res.send(user)
    })
}

function add(req, res, next) {
    User.create(req.body).then((user) => {
        res.send(user)
    }).catch(next)
}

function update(req, res, next) {
    const id = req.params.id
    const filter = { _id: id }
    User.findByIdAndUpdate(filter, req.body).then((user) => {
        User.findOne(filter).then((user) => {
            res.send(user)
        })
    })
}

function remove(req, res, next) {
    const id = req.params.id
    const filter = { _id: id }
    User.findByIdAndRemove(filter).then((user) => {
        res.send(user)
    })
}

module.exports = { getAll, getById, add, update, remove }