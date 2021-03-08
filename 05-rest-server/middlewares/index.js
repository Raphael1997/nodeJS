const validateField = require("../middlewares/validate-field");
const validateJWT = require("../middlewares/validate-jwt");
const validateRole = require("../middlewares/validate-role");


module.exports = {
    ...validateField,
    ...validateJWT,
    ...validateRole
}