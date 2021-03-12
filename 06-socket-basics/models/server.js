const express = require("express");
const cors = require('cors');

const { socketController } = require("../sockets/controller")

class Server {

    constructor() {

        this.app = express();
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.listen();

        this.sockets();

        // middlewares
        this.middlewares();

    }

    middlewares() {

        //cors 
        this.app.use(cors());

        // public directory
        this.app.use(express.static("public"));
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {

        this.server.listen(process.env.PORT, () => {
            console.log("App running at: ", process.env.PORT);
        });
    }
}

module.exports = Server;