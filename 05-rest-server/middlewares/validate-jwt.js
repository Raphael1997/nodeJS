const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
const validateJWT = async (req, res, next) => {

    const token = req.header("x-token");

    try {

        if (!token) {
            return res.status(401).json({
                message: "There is no token in the request"
            });
        }

        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const usuario = await User.findById(id);
        // check if user is deleted
        if (!usuario.status) {
            return res.status(401).json({
                message: "Token invalid - invalid user"
            });
        }
        req.usuario = usuario;
        req.id = id;

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = {
    validateJWT
}