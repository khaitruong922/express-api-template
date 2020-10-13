const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const REFERESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
function generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
}
module.exports = { generateAccessToken }