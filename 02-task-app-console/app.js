const { inquirerMenu, pause, readInput, listTaskDelete, confirmQuestion, showListCheckList } = require("./helpers/inquire");
const { saveDB, readDB } = require("./helpers/saveFile");
const Tasks = require("./models/tasks");


require("colors");

const main = async () => {

    let opt = "";
    const tasks = new Tasks();

    const tasksDB = readDB();

    // load task from db
    if (tasksDB) {

        tasks.loadTaskFromArray(tasksDB);
    }

    do {
        opt = await inquirerMenu();
        console.log({ opt });

        switch (opt) {
            case "1":

                const desc = await readInput("Descripcion: ");
                tasks.createTask(desc);
                break;
            case "2":

                tasks.listTasks();
                break;
            case "3":

                tasks.listCompleted();
                break;
            case "4":

                tasks.listPending();
                break;

            case "5":

                const ids = await showListCheckList(tasks.getList);

                tasks.toggleCompleted(ids);
                console.log(ids);
                break;

            case "6":

                const { id } = await listTaskDelete(tasks.getList);
                if (id !== "0") {
                    const ok = await confirmQuestion("Are you sure?");
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log("tarea borrada");
                    }
                }
                break;
        }


        saveDB(tasks.getList);
        if (opt !== "0") await pause();
    } while (opt !== "0");

}

main();