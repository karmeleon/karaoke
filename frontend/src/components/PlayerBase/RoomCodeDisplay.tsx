import React, { FC } from 'react';
import { Typography, Paper, Grid } from '@material-ui/core';

interface Props {
	roomCode: string,
}

const RoomCodeDisplay: FC<Props> = ({ roomCode }) =>
	<Grid item xs={2}>
		<Paper>
			<Typography align="center" variant="h4">Room code:</Typography>
			<Typography align="center" variant="h1" color="primary">{roomCode}</Typography>
		</Paper>
	</Grid>;

export default RoomCodeDisplay;
