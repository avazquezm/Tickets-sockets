// Referencias del HTML
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje= document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

// Socket 
const socket = io();

socket.on('connect', () =>{

    // console.log('connected');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';

});

socket.on('disconnect', () =>{

    // console.log('disconnected');

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';

});

socket.on('enviar-mensaje', (payload) =>{
    console.log(payload);
});

btnEnviar.addEventListener('click', () =>{

    const mensaje = txtMensaje.value;

    const payload = {
        mensaje,
        id: socket.id
    }

    socket.emit('enviar-mensaje', payload, (id) => {

        console.log('Desde el server', id);

    });


})