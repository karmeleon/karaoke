import React, { FC } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';

interface Props {
	// The name of the user we're displaying
	name: string,
}

const UserIsland: FC<Props> = ({ name }) =>
	<Grid item xs={2}>
		<Paper>
			<Typography align="center" variant="h1" color="primary">{name}</Typography>
		</Paper>
	</Grid>;

export default UserIsland;
