import { ExpressPeerServer } from 'peerjs-server';
import app from './app';

const port = process.env.PORT || 9000;

// Start express App
const server = app.listen(port);

// Fire up the peerjs server
// TODO: make this work. In the mean time, let it auto-connect to the
// default, public PeerJS server.
/*
const peerServerOptions = {
    debug: true,
    port: 9000,
};

const peerServer = ExpressPeerServer(server, peerServerOptions);
//app.use('/peerjs', peerServer);
*/

console.log(`App listening on port ${port}...`);
