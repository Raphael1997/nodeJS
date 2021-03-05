const express = require("express");
const cors = require('cors');


class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.pathUsers = "/api/users";

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

        this.app.use(express.static("public"));
    }

    routes() {

        this.app.use(this.pathUsers, require("../routes/user.routes"));
    }

    listen() {

        this.app.listen(process.env.PORT, () => {
            console.log("App running at: ", process.env.PORT);
        });
    }
}

module.exports = Server;