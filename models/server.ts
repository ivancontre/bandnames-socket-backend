// Servidor de Express
import express from 'express';
import cors from 'cors';
import * as socketio from 'socket.io';
import { createServer, Server as ServerHttp } from 'http';
import path from 'path'

import Sockets from './sockets'

export default class Server {
    app: express.Application;
    port: string;
    paths: any;
    server: ServerHttp;
    io: socketio.Server

    constructor() {

        this.app  = express();
        this.port = process.env.PORT || '8080';
        this.server = createServer(this.app);
        this.io = new socketio.Server(this.server);
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );

        // CORS
        this.app.use( cors() );

    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configurarSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configurarSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port );
        });
    }

}