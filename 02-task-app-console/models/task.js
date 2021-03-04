const { v4 } = require("uuid");

class Task {

    id;
    desc;
    completed;

    constructor(desc) {
        this.id = v4();
        this.desc = desc;
        this.completed = null;
    }

}

module.exports = Task;