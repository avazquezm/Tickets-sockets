// Referencias HTML
const lblDesk = document.querySelector('#lblDesk');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

// Obtener info de los params de la URL
const searchParams = new URLSearchParams( window.location.search );

// Si el param no es "desk" lo enviamos a la pagina inicial y lanzamos error
if( !searchParams.has('desk') ){
    window.location = 'index.html';
    throw new Error('This url param not exists');
}

// Alerta no hay mas tickets oculta
divAlert.style.display = 'none';

// Asignar nombre de escritorio
const desk = searchParams.get('desk');
lblDesk.innerText = 'Escritorio ' + desk;


const socket = io();

socket.on('connect', () => {
    btnAttend.disabled = false;

});

socket.on('disconnect', () => {
    btnAttend.disabled = true;
});

socket.on('queue-state', (queue) => {

    if(queue === 0){
        lblPendientes.style.display = 'none';
        divAlert.style.display = '';  
    }else{
        divAlert.style.display = 'none';  
        lblPendientes.style.display = '';
        lblPendientes.innerText = queue;
    }


});

btnAttend.addEventListener( 'click', () => {

    const payload = {
        desk
    }
    
    socket.emit('attend-ticket', payload, ({ok, ticketNum}) =>{

        // No quedan tickets o hay un error
        if( !ok ){
            lblTicket.innerText = 'Nadie';
            return;  
        }
        
        lblTicket.innerText = 'Ticket ' + ticketNum;


    });


});


