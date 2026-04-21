const AppError = require('../utils/AppError');

const errorMiddleware = (err, req, res, next) => {
    console.error(err);
    const statusCode = err.statusCode || 500;
    
    if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID' });
}
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error'
    });
};

module.exports = errorMiddleware;