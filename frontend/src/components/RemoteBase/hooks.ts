import { useEffect, useState } from 'react';
import Peer from 'peerjs';
import { ConnectionMetadata } from '../Common/Connection';
import { generateRandomString, generatePeerJSKey } from '../Common/RoomCode';

export interface ConnectionStatus {
    // Whether the remote is connected.
    isConnected: boolean,
    // This user's connected friendly name.
    friendlyName: string | null,
    // Connect the remote to a player with a given room code and display name.
    connectToPlayer: (roomCode: string, friendlyName: string) => void,
};

export function useLogic(): ConnectionStatus {
    const [isConnected, setIsConnected] = useState(false);
    const [friendlyName, setFriendlyName] = useState<string | null>(null);

    const connectToPlayer = (roomCode: string, friendlyName: string): void => {
        const metadata: ConnectionMetadata = {
            friendlyName,
            id: generateRandomString(24),
        };

        const peerJSKey = generatePeerJSKey(roomCode.toUpperCase());

        // TODO: catch nonexistent room code
        const peer = new Peer({
			debug: 3,
			config: {
				'iceServers': [
					{ urls: ['stun:stun.l.google.com:19302'] },
					{ urls: ['stun:stun1.l.google.com:19302'] },
				],
			},
		});

		const connection = peer.connect(peerJSKey, { metadata });

		const constraints = {
			audio: {
				channels: 1,
				latency: 0.0,
				echoCancellation: true,
				noiseSuppression: true,
			},
			video: false,
		}

		connection.on('open', () => {
			navigator.mediaDevices.getUserMedia(constraints)
				.catch(e => console.error(e))
				.then(mediaStream => {
					if (mediaStream != null) {
						console.log('calling');
                        peer.call(peerJSKey, mediaStream, { metadata });
                        // We should have connected by this point
                        setIsConnected(true);
                        setFriendlyName(friendlyName);
					}
				});
        });
    };
    
    return {
        isConnected,
        friendlyName,
        connectToPlayer,
    };
}
