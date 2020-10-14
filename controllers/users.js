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
    // This is for getting all users
    const filter = {}
    // This is for getting the authorized user only
    // const filter = { _id: req.user._id }
    const users = await User.find(filter)
    res.send(users)
}

async function getById(req, res, next) {
    const { id } = req.params
    const filter = { _id: id }
    const user = await User.findOne(filter)
    res.send(user)
}


async function update(req, res, next) {
    const { id } = req.params
    const filter = { _id: id }
    const user = await User.findByIdAndUpdate(filter, req.body)
    const updatedUser = await User.findOne(filter)
    res.send(updatedUser)
}

async function remove(req, res, next) {
    const { id } = req.params
    const filter = { _id: id }
    const user = await User.findByIdAndRemove(filter)
    res.send(user)
}


module.exports = { getAll, getById, update, remove }