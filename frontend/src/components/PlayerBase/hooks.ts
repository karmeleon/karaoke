import { useState, useEffect, useReducer, useCallback, useRef } from 'react';
import Peer, { DataConnection, MediaConnection } from 'peerjs';

import { generateRoomCode, generatePeerJSKey } from '../Common/RoomCode';
import { ConnectionMetadata } from '../Common/Connection';
import { Playlist, PlaylistMessage, Message } from '../Common/Messages';

import { playlistReducer } from './reducers';

export type PlaylistDispatch = (message: PlaylistMessage) => void;
export type RemotesState = {[id: string]: Remote; };

export interface ConnectionStatus {
    connectedUsers: ConnectionMetadata[],
    playlist: Playlist,
    playlistDispatch: PlaylistDispatch,
    roomCode: string,
}

export enum RemoteState {
    // We've established a connection with this remote, but don't have
    // any audio from them
    Connected,
    // We're receiving audio from this remote
    AudioConnected,
};

/**
 * Represents a user connecting to this Player with a Remote
 */
export interface Remote {
    // Metadata for this connection
    metadata: ConnectionMetadata,
    // The DataConnection (i.e. data channel) for this Remote
    connection: DataConnection,
    // State of this Remote's connection
	state: RemoteState,
	// Timestamp of when this remote connected
	joinTime: Date,
    // The MediaConnection (i.e. audio call) for this Remote
    call?: MediaConnection,
    // The audio tag this peer's audio is going to
    audioElement?: HTMLAudioElement,
}

/**
 * Handles all communication between this Player instance and any Remotes
 * that connect.
 */
export function useLogic(): ConnectionStatus {
    const roomCode = useRef(generateRoomCode());
    const [playlist, playlistDispatch] = useReducer(playlistReducer, ['deez nuts lol']);
	const [connectedUsers, setConnectedUsers] = useState<ConnectionMetadata[]>([]);
	
	// Update the external-facing users array. Should be called anytime a user
	// connects, disconnects, or updates their metadata.
	const updateConnectedUsers = useCallback((remotes: RemotesState) => {
		const users = Object.values(remotes)
			// the oldest connected user is first
			.sort((a, b) => a.joinTime.getTime() - b.joinTime.getTime())
			// we only care about the metadata outside of this hook
			.map(remote => remote.metadata);
		setConnectedUsers(users);
	}, [setConnectedUsers]);

    useEffect(() => {
        const peer = new Peer(generatePeerJSKey(roomCode.current), {
            debug: 3,
            config: {
				'iceServers': [
					{ urls: ['stun:stun.l.google.com:19302'] },
					{ urls: ['stun:stun1.l.google.com:19302'] },
				],
			},
		});
		
		const remotes: RemotesState = {};

        peer.on('connection', dataConnection => {
            const metadata: ConnectionMetadata = dataConnection.metadata;
			console.log(`new connection from ${metadata.id}`);

            remotes[metadata.id] = {
                metadata,
				state: RemoteState.Connected,
				joinTime: new Date(),
                connection: dataConnection,
			};
			
			updateConnectedUsers(remotes);

            dataConnection.on('data', (message: Message) => {
                if (message.type.startsWith('playlist')) {
                    playlistDispatch(message);
                } else {
                    console.warn(`Got an unhandled message: ${JSON.stringify(message)}`);
                }
            });

            dataConnection.on('close', () => {
                const remote = remotes[metadata.id];
                // clean up after ourselves
                if (remote.audioElement) {
                    remote.audioElement.srcObject = null;
                }
                if (remote.call) {
                    remote.call.close();
                }
                remote.connection.close();
				delete remotes[metadata.id];
				
				updateConnectedUsers(remotes);
            });
        });

        peer.on('call', async call => {
            const metadata: ConnectionMetadata = call.metadata;
            console.log(`answering call from ${metadata.id}`);

            const remote = remotes[metadata.id];
            remote.call = call;

            call.on('stream', stream => {
                const audioElement = document.createElement('audio');
                remote.audioElement = audioElement;
                audioElement.srcObject = stream;
                audioElement.play();
                remote.state = RemoteState.AudioConnected;
            });

            call.answer();
        });

        return () => {
            peer.destroy();
        };
    }, [roomCode, updateConnectedUsers]);

    return {
        connectedUsers,
        playlist,
        playlistDispatch,
        roomCode: roomCode.current,
    }
};
