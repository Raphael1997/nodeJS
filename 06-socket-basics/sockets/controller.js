
const socketController = (client) => {

    client.on("connect", () => {
        console.log("Cliente conectado");
    })

    client.on('disconnect', () => {
        console.log("Cliente desconectado", client.id);
    });

    client.on('enviar-mensaje', (data, callback) => {

        const id = 123456;
        callback(id);
        client.broadcast.emit("enviar-mensaje", data);
    });


}

module.exports = {
    socketController
}