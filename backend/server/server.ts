import { ExpressPeerServer } from 'peerjs-server';
import app from './app';

const port = process.env.PORT || 9000;

// Start express App
const server = app.listen(port);

// Fire up the peerjs server
const peerServerOptions = {};

const peerServer = ExpressPeerServer(server, peerServerOptions);
app.use('/api/peer_server', peerServer);

console.log(`App listening on port ${port}...`);
