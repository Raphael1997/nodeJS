const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const login = async (req, res) => {

    const { email, password } = req.body;
    try {

        const userDB = await User.findOne({ email });

        if (!userDB) {
            return res.status(400).json({
                message: "User or password are invalid - email"
            });
        }

        if (!userDB.status) {
            return res.status(400).json({
                message: "The user is deactivated, talk with the ADM"
            });
        }

        // check password
        const validPassword = bcrypt.compareSync(password, userDB.password);

        if (!validPassword) {
            return res.status(400).json({
                message: "User or password are invalid - password"
            });
        }

        // generate jwt
        const token = await generateJWT(userDB.id);

        res.json({
            token,
            email,
            password
        })
    } catch (error) {
        res.satus(500).json({
            message: "Error - Talk with the ADM"
        })
    }

}

module.exports = {
    login
}