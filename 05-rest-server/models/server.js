const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../db/config")
const fileUpload = require("express-fileupload");


class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.pathUsers = "/api/users";
        this.pathAuth = "/api/auth";
        this.pathCategories = "/api/categories";
        this.pathProduct = "/api/product";
        this.pathSearch = "/api/search";
        this.pathUpload = "/api/upload";

        dbConnection();

        // middlewares
        this.middlewares();

        // route
        this.routes();


    }

    middlewares() {

        //cors 
        this.app.use(cors());

        // parseo and read body
        this.app.use(express.json());

        // public directory
        this.app.use(express.static("public"));

        // File upload
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {

        this.app.use(this.pathUsers, require("../routes/user.routes"));
        this.app.use(this.pathAuth, require("../routes/auth.routes"));
        this.app.use(this.pathCategories, require("../routes/categories.routes"));
        this.app.use(this.pathProduct, require("../routes/product.routes"));
        this.app.use(this.pathSearch, require("../routes/search.routes"));
        this.app.use(this.pathUpload = "/api/upload", require("../routes/uploads.routes"));
    }

    listen() {

        this.app.listen(process.env.PORT, () => {
            console.log("App running at: ", process.env.PORT);
        });
    }
}

module.exports = Server;