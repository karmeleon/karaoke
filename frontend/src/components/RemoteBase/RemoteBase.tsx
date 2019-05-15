import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { FC, useEffect } from 'react';
import Peer from 'peerjs';

const RemoteBase: FC<{}> = () => {
	useEffect(() => {
		const peer = new Peer({
			debug: 3,
			config: {
				'iceServers': [
					{ urls: ['stun:stun.l.google.com:19302'] },
					{ urls: ['stun:stun1.l.google.com:19302'] },
				],
			},
		});

		const connection = peer.connect('deezNutsLol');

		function messageLoop() {
			setTimeout(() => {
				console.log('sending');
				connection.send('ayy lmao');
				messageLoop();
			}, 1000);
		}

		messageLoop();

		const constraints = {
			audio: true,
			video: false,
		}

		connection.on('open', () => {
			navigator.mediaDevices.getUserMedia(constraints)
				.catch(e => console.error(e))
				.then(mediaStream => {
					if (mediaStream != null) {
						console.log('calling');
						const call = peer.call('deezNutsLol', mediaStream);
					}
				});
		});
	});

	return <Typography variant="h2">Connecting to SUCC</Typography>
};

export default RemoteBase;
