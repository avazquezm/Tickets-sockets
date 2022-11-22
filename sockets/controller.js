const socketController = (socket) => {

    socket.on('disconnect', () =>{
        // console.log('Socket client disconnected', socket.id);
    });

    socket.on('enviar-mensaje', (payload, callback) => {

        // this.io.emit('enviar-mensaje', payload);
        const id = socket.id;
        callback({id, fecha: new Date().getTime()});

        socket.broadcast.emit('enviar-mensaje', payload);

    });
}

export{
    socketController
}