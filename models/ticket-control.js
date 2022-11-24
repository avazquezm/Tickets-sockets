import data from '../db/data.json' assert {type:'json'};
import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


class Ticket {
    
    constructor( num, desk ){
        this.num = num;
        this.desk = desk;
    }


}

export default class TicketControl {

    constructor(){
        this.last = 0;
        this.day = new Date().getDate(); 
        this.ticketList = [];
        this.last4 = [];

        this.init();
    }


    // Lo interesante de los getters es que se acceden así clase.getter
    // como una propiedad y no como una funcion
    get toJson(){
        return {
        last: this.last,
        day: this.day,
        ticketList: this.ticketList,
        last4: this.last4,
     }
    }

    init(){

        const {last, day, ticketList, last4} = data;

        // Comprobamos si el dia de la BD es el mismo al dia de hoy

        if( day === this.day ){
            // Significa que estoy reiniciando el servidor, recuperamos los datos
            this.last = last;
            this.ticketList = ticketList;
            this.last4 = last4;

        }else{
            // Si es otro dia reiniciamos la BD con los datos iniciales
            this.saveDB();
        }

    }

    saveDB(){
        const dbPath = path.join(__dirname, '../db/data.json');

        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

    next(){
        this.last += 1;
        const ticket = new Ticket(this.last, null);
        this.ticketList.push(ticket);

        this.saveDB();

        return ticket;
    }

    attendTicket( desk ){

        // No hay tickets disponibles
        if(this.ticketList.length === 0){
            return null;
        }

        // obtener el primer valor de la lista y además eliminarlo
        const ticket = this.ticketList.shift();

        // asignamos el escritorio 
        ticket.desk = desk;

        // Añadir al inicio de la lista de ultimos 4
        this.last4.unshift(ticket);

        //Limitar tamaño a 4
        this.last4 = this.last4.slice(0,4);

        this.saveDB();

        return ticket;


    }

}

