const express = require('express')
const User = require('../models/user')
const { generateAccessToken } = require('../utils/token')
const validateRegister = require('../validators/register')
const bcrypt = require('bcrypt')


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

async function register(req, res, next) {
    const { error } = validateRegister(req.body)
    if (error) return res.status(400).json({ message: error.details[0].message })
    const { username, password, email } = req.body
    if (await isUsernameExists(username)) return res.status(400).json({ message: "Username is already taken." })
    if (await isEmailExists(email)) return res.status(400).send({ message: "Email is already taken." })

    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        req.body.password = hashedPassword
        const user = await User.create(req.body)
        res.send(user)
        console.log(salt)
        console.log(hashedPassword)
    } catch (e) {
        next(e)
    }
}
async function login(req, res, next) {
    const { username, password } = req.body
    const filter = { $or: [{ username: username }, { email: username }] }
    const user = await User.findOne(filter)
    if (user === null) return res.status(400).json({ message: "Sign in failed." })
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(400).json({ message: "Sign in failed." })
    const token = generateAccessToken({ _id: user._id })
    res.json({ message: "Sign in sucessfully.", token: token })

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

async function isUsernameExists(username) {
    const filter = { username: username }
    const user = await User.findOne(filter)
    return user !== null
}

async function isEmailExists(email) {
    const filter = { email: email }
    const user = await User.findOne(filter)
    return user !== null
}

module.exports = { getAll, getById, register, update, remove, login }