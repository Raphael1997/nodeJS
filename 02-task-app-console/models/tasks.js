require("colors")

const Task = require("./task");

class Tasks {

    _list;
    listArray;
    constructor() {
        this._list = {};

    }

    get getList() {

        this.listArray = [];
        Object.keys(this._list).forEach(key => {
            this.listArray.push(this._list[key]);
        });

        return this.listArray;
    }

    loadTaskFromArray(tasks = []) {

        tasks.forEach(task => {

            this._list[task.id] = task;
        })
    }

    createTask(desc) {

        const task = new Task(desc);

        this._list[task.id] = task;
    }


    listTasks() {

        const tasksArr = this.getList;
        tasksArr.forEach((task, i) => {

            const indice = `${i + 1}`.green;

            if (task.completed == null)
                console.log(`${indice} :: ${task.desc} | ${"Pending".red} `);
            else
                console.log(`${indice} :: ${task.desc} | ${"Completed".green} `);

        });
    }

    listCompleted() {

        const taskCompleted = this.getList;

        taskCompleted.forEach((completed, i) => {

            const indice = `${i + 1}`.green;
            if (completed.completed !== null) console.log(`${indice + ".".green} :: ${completed.desc} | ${completed.completed} `);
        });
    }

    listPending() {

        const taskPending = this.getList;

        taskPending.forEach((pending, i) => {

            const indice = `${i + 1}`.green;
            if (pending.completed == null) console.log(`${indice + ".".green} :: ${pending.desc} | ${"Pending".red} `);
        });
    }

    deleteTask(id) {

        if (this._list[id]) {

            delete this._list[id];
        }
    }

    toggleCompleted(ids) {

        ids.forEach(id => {

            const task = this._list[id];

            if (!task.completed) {

                task.completed = new Date().toDateString();
            }
        });

        this.getList.forEach(task => {

            if (!ids.includes(task.id)) {

                this._list[task.id].completed = null;
            }
        })

    }
}

module.exports = Tasks;