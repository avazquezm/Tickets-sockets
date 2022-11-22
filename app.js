import * as dotenv from 'dotenv'; 
dotenv.config();
import ServerMain from './models/server.js'

const server = new ServerMain();

server.listen();