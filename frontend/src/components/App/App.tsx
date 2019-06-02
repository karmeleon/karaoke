import { Button, CssBaseline, createMuiTheme, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import PlayerBase from '../PlayerBase';
import RemoteBase from '../RemoteBase';

const useStyles = makeStyles((theme: Theme) => 
	createStyles({
		fullscreenContainer: {
			position: 'absolute',
			overflow: 'hidden',
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between',
		},
	})
);

const theme = createMuiTheme({
	palette: {
		type: 'dark',
	},
});

const AppSelector: FC<{}> = () => {
	const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

	if (redirectUrl !== null) {
		return <Redirect push to={redirectUrl} />
	}

	return (
		<Grid container direction="column" justify="center" alignItems="center" spacing={2}>
			<Grid item xs={3}>
				<Button 
					onClick={() => setRedirectUrl('/player')}
					color="primary"
					variant="contained"
					fullWidth
				>
					Karaoke
				</Button>
			</Grid>
			<Grid item xs={3}>
				<Button
					onClick={() => setRedirectUrl('/remote')}
					color="primary"
					variant="contained"
					fullWidth
				>
					Remote
				</Button>
			</Grid>
		</Grid>
	);
};

const App: FC<{}> = () => {
	const classes = useStyles();

	return (
		<div className={classes.fullscreenContainer}>
			<ThemeProvider theme={theme}><CssBaseline />
				<Router>
					<Route path="/remote" component={RemoteBase} />
					<Route path="/player" component={PlayerBase} />
					<Route path="/" exact component={AppSelector} />
				</Router>
			</ThemeProvider>
		</div>
	);
};

export default App;
