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

            socket.on('band-vote', (data: any) => {
                this.bandList.increaseVotes(data.id);
                this.io.emit('band-list', this.bandList.getBands());
            });

            socket.on('band-remove', (data: any) => {
                this.bandList.removeBand(data.id);
                this.io.emit('band-list', this.bandList.getBands());
            });

            socket.on('band-change-name', (data: any) => {
                this.bandList.changeBandName(data.id, data.name);
                this.io.emit('band-list', this.bandList.getBands());
            });

            socket.on('band-add', (data: any) => {
                this.bandList.addBand(data.name);
                this.io.emit('band-list', this.bandList.getBands());
            });
        
        });
    }


}