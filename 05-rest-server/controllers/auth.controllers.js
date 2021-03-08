const User = require("../models/user.models");
const bcrypt = require("bcryptjs");
const { googleVerify } = require("../helpers/google-verify")
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

const googleSignIn = async (req, res) => {

    try {
        const { id_token } = req.body;
        const { email, img, name } = await googleVerify(id_token);

        let userDB = await User.findOne({ email });

        if (!userDB) {

            const data = {
                name,
                email,
                password: "@@@",
                img,
                google: true
            };

            userDB = new User(data);
            await userDB.save();
        }

        if (!userDB.status) {
            return res.status(400).json({
                message: "The user is deactivated, talk with the ADM"
            });
        }

        const token = await generateJWT(userDB.id);

        res.json({
            userDB,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Invalid google token"
        })
    }
}

module.exports = {
    login,
    googleSignIn
}