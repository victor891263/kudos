const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token')
    if (!token) {
        res.status(401).send('Only logged in users have access')
        return
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (error) {
        res.status(400).send(error.message || 'Failed to login')
    }
}