const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnEnviar  = document.querySelector('button');

const socket = io();

socket.on('connect', () => {

    btnEnviar.disabled = false;

});

socket.on('disconnect', () => {

    btnEnviar.disabled = true;
});

btnEnviar.addEventListener( 'click', () => {
    
    socket.emit( 'next-ticket', null , ( ticketNum ) => {

        lblNuevoTicket.innerText = 'Ticket ' + ticketNum;

    });

    // socket.broadcast.emit('queue-state', null, (callback) =>{

        

    // }); 

});

socket.on('last-ticket', ticketNum => {

    lblNuevoTicket.innerText = 'Ticket ' + ticketNum;

})


