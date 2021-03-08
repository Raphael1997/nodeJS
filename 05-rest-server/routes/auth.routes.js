const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controllers")
const { validateField } = require("../middlewares/validate-field");


const router = Router();


router.post("/",
    [
        check("email", "The email is required").isEmail(),
        check("password", "The password is required").notEmpty(),
        validateField
    ],
    login
);



module.exports = router;