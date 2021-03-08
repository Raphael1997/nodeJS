const jwt = require("jsonwebtoken");

const generateJWT = async (id) => {

    return new Promise((resolve, reject) => {
        // en el payload no se pone informacion sensible
        const payload = {
            id
        };

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "24h"
        }, (error, token) => {

            if (error) reject("Error generating JWT");
            else resolve(token);
        });
    })
}

module.exports = {
    generateJWT
}