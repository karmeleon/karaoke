import { Typography, Grid, Button, TextField } from '@material-ui/core';
import React, { FC, useEffect, useRef, useCallback } from 'react';
import { useLogic } from './hooks';

import styles from './RemoteBase.module.scss';

const RemoteBase: FC<{}> = () => {
	const {
        isConnected,
        friendlyName,
        connectToPlayer,
	} = useLogic();
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
		<Grid container direction="column" justify="space-evenly" alignItems="center" spacing={2}>
			<Grid item xs={12}>
				<TextField
					className={styles.roomCodeInput}
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
		</Grid>
	);
};

export default RemoteBase;
