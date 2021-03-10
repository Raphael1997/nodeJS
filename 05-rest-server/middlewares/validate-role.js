
const adminRole = async (req, res, next) => {

    try {

        if (!req.user) {
            return res.status(500).json({
                message: "You must validate the token first"
            });
        }

        const { role } = req.user;

        if (role !== "ADMIN_ROLE") {
            return res.status(401).json({
                message: "You need be an ADM to do this"
            });
        }

        next();
    } catch (error) {
        console.log(error);
    }
}

const haveRole = (...roles) => {
    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                message: "You must validate the token first"
            });
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                message: "The role need be one of them: " + roles
            })
        }
        next();
    }
}

module.exports = {
    adminRole,
    haveRole
}