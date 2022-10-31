module.exports = async (error, req, res, next) => {
    res.status((res.statusCode < 300) ? 500 : res.statusCode).send(error.message || 'Unknown error encountered')
}