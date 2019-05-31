import { Button, CssBaseline, createMuiTheme, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import PlayerBase from '../PlayerBase';
import RemoteBase from '../RemoteBase';

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

const App: FC<{}> = () => 
<ThemeProvider theme={theme}><CssBaseline />
	<Router>
		<Route path="/remote" component={RemoteBase} />
		<Route path="/player" component={PlayerBase} />
		<Route path="/" exact component={AppSelector} />
	</Router>
</ThemeProvider>;

export default App;
