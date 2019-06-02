import React, { FC, useRef, useCallback } from 'react';
import { Grid, Button, TextField, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => 
	createStyles({
		roomCodeInput: {
			'& input': {
				textTransform: 'uppercase',
			},
		},
	})
);

interface Props {
	// Callback to connect the remote to a player with a given room code and display name.
    connectToPlayer: (roomCode: string, friendlyName: string) => void,
}

const ConnectionPanel: FC<Props> = ({ connectToPlayer }) => {
	const classes = useStyles();

	const roomCodeInputRef = useRef<HTMLInputElement>(null);
	const displayNameInputRef = useRef<HTMLInputElement>(null);

	const buttonCallback = useCallback(() => {
		const roomCode = roomCodeInputRef.current && roomCodeInputRef.current.value;
		const displayName = displayNameInputRef.current && displayNameInputRef.current.value;

		// this should always be true.
		if (roomCode && displayName) {
			connectToPlayer(roomCode, displayName);
		}
	}, [roomCodeInputRef, displayNameInputRef, connectToPlayer]);

	return (
		<>
			<Grid item xs={12}>
				<TextField
					className={classes.roomCodeInput}
					label="Room Code"
					variant="outlined"
					autoFocus
					inputProps={{
						maxLength: 4,
					}}
					inputRef={roomCodeInputRef}
				/>
			</Grid>
			<Grid item xs={12}>
				<TextField
					label="Display Name"
					variant="outlined"
					inputProps={{
						maxLength: 12,
					}}
					inputRef={displayNameInputRef}
				/>
			</Grid>
			<Grid item xs={12}>
				<Button
					color="primary"
					variant="contained"
					fullWidth
					onClick={buttonCallback}
				>
					Connect
				</Button>
			</Grid>
		</>
	);
};

export default ConnectionPanel;
