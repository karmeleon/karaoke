import {
	AppBar,
	createStyles,
	InputBase,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	makeStyles,
	Theme,
	Toolbar,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MusicNote from '@material-ui/icons/MusicNote';
import SearchIcon from '@material-ui/icons/Search';
import React, { FC, useState } from 'react';
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
	}),
);

interface Props {
	// A callback to send a Message to the connected Player.
	sendMessage: ConnectionStatus['sendMessage'];
}

interface SearchResult {
	displayText: string;
	videoId: string;
}

const MainRemoteInterface: FC<Props> = ({ sendMessage }) => {
	const classes = useStyles();
	const [searchResults, setSearchResults] = useState<SearchResult[]>([
		{
			displayText: 'Despacito',
			videoId: 'MwQT7b_Dtac',
		},
		{
			displayText: 'All Star',
			videoId: 'N-elJ7vQl54',
		},
	]);

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<MusicNote />
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
			<List>
				{searchResults.map(result =>
					<ListItem button key={result.videoId} onClick={() => sendMessage({
						type: 'playlist.queue',
						song: result.videoId,
					})}>
						<ListItemIcon><MusicNote /></ListItemIcon>
						<ListItemText primary={result.displayText} />
					</ListItem>,
				)}
			</List>
		</>
	);
};

export default MainRemoteInterface;
