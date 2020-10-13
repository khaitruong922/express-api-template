const jwt = require('jsonwebtoken')
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

function auth(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({ message: 'Access denied.' })
    try {
        const verified = jwt.verify(token, ACCESS_TOKEN_SECRET)
        req.user = verified
        console.log(verified)
        next()
    }
    catch (e) { res.status(400).json({ message: 'Invalid token.' }) }
}

module.exports = auth