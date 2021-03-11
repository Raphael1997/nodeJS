const { Router } = require("express");
const { fileUploadC } = require("../controllers/uploads");
const { validateJWT } = require("../middlewares")

const router = Router();


router.post("/",
    [
        validateJWT
    ],
    fileUploadC
);


module.exports = router;