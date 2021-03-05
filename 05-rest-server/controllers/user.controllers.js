

const getUsers = (req, res) => {

    const { saludos, nombre } = req.query;
    res.json({
        msg: "working",
        saludos,
        nombre
    })
}
const postUsers = (req, res) => {

    const { age, name } = req.body;


    res.json({
        name,
        age,
        id
    })
}
const putUsers = (req, res) => {

    const { id } = req.params;
    res.json({
        msg: "put",
        id
    })
}
const patchUsers = (req, res) => {

    res.json({
        msg: "patch"
    })
}
const deleteUsers = (req, res) => {

    res.json({
        msg: "delete"
    })
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers,
}