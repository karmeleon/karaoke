import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { FC, useEffect } from 'react';
import Peer from 'peerjs';

const RemoteBase: FC<{}> = () => {
	useEffect(() => {
		const peer = new Peer({
			host: '/',
            path: '/api/peer_server',
            port: 3000,
		});

		const connection = peer.connect('kljaiuwrioq7w889ra89s7f9a');

		setTimeout(() => connection.send('ayy lmao'), 1000);

		const constraints = {
			audio: true,
			video: false,
		}

		navigator.mediaDevices.getUserMedia(constraints)
			.catch(e => console.error(e))
			.then(mediaStream => {
				if (mediaStream != null) {
					console.log('calling');
					const call = peer.call('kljaiuwrioq7w889ra89s7f9a', mediaStream);
				}
			});
	});

	return <Typography variant="h2">Connecting to SUCC</Typography>
};

export default RemoteBase;
