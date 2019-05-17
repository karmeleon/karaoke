import React, { FC, useContext } from 'react';
import { Typography } from '@material-ui/core';

import { Playlist } from '../Common/Messages';
import { PlaylistDispatchContext } from './Context';

interface Props {
	// The list of videos to play
	playlist: Playlist,
}

const VideoDisplay: FC<Props> = ({ playlist }) => {
	const playlistDispatch = useContext(PlaylistDispatchContext);

	return <>
		{playlist.map(song => <Typography variant="h3" color="primary">{song}</Typography>)}
	</>;
};

export default VideoDisplay;
