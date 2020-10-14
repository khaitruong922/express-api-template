const User = require('../models/user')
const { generateAccessToken } = require('../utils/token')
const bcrypt = require('bcrypt')
const validateRegister = require('../validators/register')


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
    } catch (e) {
        next(e)
    }
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

module.exports = { login, register }