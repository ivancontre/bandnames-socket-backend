import * as socketio from 'socket.io';
import BandList from './band-list';

export default class Sockets {
    io: socketio.Server
    bandList: BandList;

    constructor( io: socketio.Server ) {

        this.io = io;
        this.bandList = new BandList();
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');

            socket.emit('band-list', this.bandList.getBands());



            // Escuchar evento: mensaje-to-server
            socket.on('mensaje-to-server', ( data: any ) => {
                console.log( data );
                
                this.io.emit('mensaje-from-server', data );
            });
            
        
        });
    }


}