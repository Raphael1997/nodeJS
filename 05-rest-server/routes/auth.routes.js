const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth.controllers")
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

router.post("/google",
    [
        check("id_token", "The id_token is required").notEmpty(),
        validateField
    ],
    googleSignIn
);


module.exports = router;