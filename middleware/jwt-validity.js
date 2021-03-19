const jwt = require('jsonwebtoken');

const isValid = (req, res, next) => {
    try {
        const validToken = jwt.verify(req.get('Authorization'), '15703728')
        if (validToken) {
            next();
        }
    } catch (error) {
        res.status(401).json({
            error: "No valid token ensured",
            status: 401,
        });      
    }

}
module.exports = isValid;