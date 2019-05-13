import React, { FC, useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Peer from 'peerjs';

const ConnectionManager: FC<{}> = () => {
    const [roomCode, setRoomCode] = useState('kljaiuwrioq7w889ra89s7f9a');

    useEffect(() => {
        const peer = new Peer(roomCode, {
            host: '/',
            path: '/api/peer_server',
            port: 9000,
        });

        const audioElement = document.createElement('audio');

        peer.on('connection', dataConnection => {
            console.log(`new connection from ${dataConnection.peer}`);

            dataConnection.on('data', data => console.log(data));
        });

        peer.on('call', async call => {
            console.log(`answering call from ${call.peer}`);

            call.on('stream', stream => {
                audioElement.src = URL.createObjectURL(stream);
                audioElement.play();
            });

            call.answer();
        });

        peer.on('close', () => {
            audioElement.remove();
        });

        console.log('ready');

        return () => {
            peer.destroy();
        };
    }, [roomCode]);

    return (
        <Paper>
            <Typography variant="h3">Room code:</Typography>
            <Typography variant="h1" color="primary">{roomCode}</Typography>
        </Paper>
    );
};

export default ConnectionManager;
