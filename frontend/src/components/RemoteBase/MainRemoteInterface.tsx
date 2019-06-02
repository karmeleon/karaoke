import React, { FC } from 'react';
import { AppBar, InputBase, Toolbar, makeStyles, Theme, createStyles } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import { ConnectionStatus } from './hooks';

const useStyles = makeStyles((theme: Theme) => 
	createStyles({
		search: {
			position: 'relative',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.15),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.25),
			},
			marginRight: theme.spacing(2),
			marginLeft: 0,
			width: '100%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(3),
				width: 'auto',
			},
		},
		searchIcon: {
			width: theme.spacing(7),
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		inputRoot: {
			color: 'inherit',
		},
		inputInput: {
			padding: theme.spacing(1, 1, 1, 7),
			transition: theme.transitions.create('width'),
			width: '100%',
			[theme.breakpoints.up('md')]: {
				width: 200,
			},
		},
	})
);

interface Props {
	// A callback to send a Message to the connected Player.
	sendMessage: ConnectionStatus['sendMessage'],
}

const MainRemoteInterface: FC<Props> = ({ sendMessage }) => {
	const classes = useStyles();

	return (
		<AppBar position="static">
			<Toolbar>
				<MusicNoteIcon />
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						placeholder="Search…"
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
					/>
				</div>
			</Toolbar>
		</AppBar>
	);
};

export default MainRemoteInterface;
