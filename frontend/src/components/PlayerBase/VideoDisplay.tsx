import { Typography } from '@material-ui/core';
import React, { FC, useCallback, useContext } from 'react';
import ReactPlayer from 'react-player';

import { Playlist } from '../Common/Messages';
import { PlaylistDispatchContext } from './Context';

interface Props {
	// The list of videos to play
	playlist: Playlist;
}

const VideoDisplay: FC<Props> = ({ playlist }) => {
	const playlistDispatch = useContext(PlaylistDispatchContext);

	const onEnded = useCallback(() => {
		playlistDispatch({ type: 'playlist.dequeue' });
	}, [playlistDispatch]);

	return <ReactPlayer
		url={`https://www.youtube.com/watch?v=${playlist[0]}`}
		onEnded={onEnded}
		playing
	/>;
};

export default VideoDisplay;
