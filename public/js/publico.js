

// Referencias HTML
const lblTicket1 = document.querySelector('#lblTicket1');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');

const lblTicket2 = document.querySelector('#lblTicket2');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');

const lblTicket3 = document.querySelector('#lblTicket3');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');

const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('actual-state', (payload) => {

    // Audio que suena cuando cambia el estado de la pantalla publica
    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play();


    // Actualizamos los 4 tickets de la pantalla publica
    const [ticket1, ticket2, ticket3, ticket4] = payload;

    if( ticket1 ){    
        lblTicket1.innerText = 'Ticket ' + ticket1.num;
        lblEscritorio1.innerText = 'Escritorio ' + ticket1.desk;
    }
    if( ticket2 ){
        lblTicket2.innerText = 'Ticket ' + ticket2.num;
        lblEscritorio2.innerText = 'Escritorio ' + ticket2.desk;
    }
    if( ticket3 ){
        lblTicket3.innerText = 'Ticket ' + ticket3.num;
        lblEscritorio3.innerText = 'Escritorio ' + ticket3.desk;
    }
    if( ticket4 ){
        lblTicket4.innerText = 'Ticket ' + ticket4.num;
        lblEscritorio4.innerText = 'Escritorio ' + ticket4.desk;
    }

});
