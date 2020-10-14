const jwt = require('jsonwebtoken')
const {ACCESS_TOKEN_SECRET,REFERESH_TOKEN_SECRET} = process.env
function generateAccessToken(payload) {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "1h" })
}
module.exports = { generateAccessToken }