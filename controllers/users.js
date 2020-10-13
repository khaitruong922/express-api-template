const express = require('express')
const User = require('../models/user')

// Add these lines above your function if you want to have params suggestions
/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 */
async function getAll(req, res, next) {
    const users = await User.find()
    res.send(users)
}

async function getById(req, res, next) {
    const id = req.params.id
    const filter = { _id: id }
    const user = await User.findOne(filter)
    res.send(user)
}

async function add(req, res, next) {
    try {
        const user = await User.create(req.body)
        res.send(user)
    } catch (e) {
        next(e)
    }
}

async function update(req, res, next) {
    const id = req.params.id
    const filter = { _id: id }
    const user = await User.findByIdAndUpdate(filter, req.body)
    const updatedUser = await User.findOne(filter)
    res.send(updatedUser)
}

async function remove(req, res, next) {
    const id = req.params.id
    const filter = { _id: id }
    const user = await User.findByIdAndRemove(filter)
    res.send(user)
}

module.exports = { getAll, getById, add, update, remove }