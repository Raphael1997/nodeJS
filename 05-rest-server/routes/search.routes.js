const { Router } = require("express");
const { search } = require("../controllers/search.controllers")

const router = Router();


router.get("/:table/:word",
    [

    ],
    search
);


module.exports = router;