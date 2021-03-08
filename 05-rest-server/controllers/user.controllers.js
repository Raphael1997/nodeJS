const User = require("../models/user.models");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {

    try {
        let page = req.query.page - 1 || 0;
        page = (page > 0) ? Number(page) : 0;

        let limit = req.query.limit || 5;
        limit = (limit > 0) ? Number(limit) : 5;

        let desde = page * limit;
        const [userDB, total] = await Promise.all([
            User.find({ status: true }).limit(Number(limit)).skip(Number(desde)),
            User.countDocuments({ status: true })
        ]);

        res.json({
            data: {
                total,
                limit,
                lastPage: Math.ceil((total < 1) ? 1 : total / limit),
                page: (page + 1),
                data: userDB
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error - talk with the ADM"
        })
    }
}


const createUser = async (req, res) => {

    const { name, password, email, role } = req.body;

    const user = new User({ name, password, email, role });

    const repeatedEmail = await User.findOne({ email });

    if (repeatedEmail) {
        return res.status(400).json({
            message: "The email is already registered"
        });
    }

    // crypt password
    user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());

    await user.save();

    res.json(user);

}


const updateUser = async (req, res) => {

    const { id } = req.params;

    const { _id, password, google, email, ...user } = req.body;

    if (password) {
        // crypt password
        user.password = bcrypt.hashSync(password, bcrypt.genSaltSync());
    }

    const userDB = await User.findByIdAndUpdate(id, user, { new: true });

    res.json(userDB);
}
const patchUsers = async (req, res) => {

    res.json({
        msg: "patch"
    })
}


const deleteUsers = async (req, res) => {

    const id = req.params.id;

    const userDB = await User.findByIdAndUpdate(id, { status: false });

    userDB.save();
    res.json({
        message: "User deactivated"
    });
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    patchUsers,
    deleteUsers,
}