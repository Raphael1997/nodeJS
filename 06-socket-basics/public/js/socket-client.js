// reference html

const online = document.querySelector("#on");
const offline = document.querySelector("#off");
const txtMenssage = document.querySelector("#txtMenssage");
const btnSubmit = document.querySelector("#btnSubmit");

const socket = io();

socket.on("connect", () => {

    online.style.display = "";
    offline.style.display = "none";
})

btnSubmit.addEventListener("click", () => {

    const message = txtMenssage.value;
    const payload = {
        message,
        time: new Date().getTime(),
        id: "123"
    }
    socket.emit("enviar-mensaje", payload, (id) => {
        console.log("Desde el cliente: " + id);
    });
})

socket.on("disconnect", () => {

    online.style.display = "none";
    offline.style.display = "";
})

socket.on("enviar-mensaje", (data) => {
    console.log(data);
})