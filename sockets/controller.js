import TicketControl from "../models/ticket-control.js";

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);
    socket.emit('actual-state', ticketControl.last4);
    socket.emit('queue-state', ticketControl.ticketList.length);

    socket.on('next-ticket', (payload, callback) => {
        const ticket = ticketControl.next();
        callback(ticket.num);

        //Notificación nuevo ticket
        socket.broadcast.emit('queue-state', ticketControl.ticketList.length);

    });

    socket.on('attend-ticket', (payload, callback) => {


        if( !payload.desk ){

            return callback({
                ok: false,
                msg: 'The desk is required'
            });

        }

        const ticket = ticketControl.attendTicket(payload.desk);


        if( !ticket ){
            callback({
                ok: false,
                msg: 'There are not any tickets left'
            });
        }else{
            
            socket.broadcast.emit('actual-state', ticketControl.last4);
            socket.emit('queue-state', ticketControl.ticketList.length)
            socket.broadcast.emit('queue-state', ticketControl.ticketList.length)

            callback({
                ok:true, 
                ticketNum: ticket.num
            });
        }


    });
}

export{
    socketController
}