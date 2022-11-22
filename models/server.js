import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socketController } from '../sockets/controller.js';
 

export default class ServerMain{

    constructor(){
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = createServer(this.app);
        this.io     = new Server(this.server);   

        // Middlewares 
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

        // Config Sockets
        this.sockets();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Directorio público
        this.app.use(express.static('public'));

    }
    

    routes() {
       
        // this.app.use('/api/auth', routerAuth);
    }

    sockets(){

        this.io.on('connection', socketController);
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('App listening on port', this.port);
        });
    }

}