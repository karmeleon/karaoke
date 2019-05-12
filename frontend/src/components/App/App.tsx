import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import React, { FC, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';

import KaraokeBase from '../KaraokeBase';
import RemoteBase from '../RemoteBase';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
	},
	typography: { useNextVariants: true },
});

const AppSelector: FC<{}> = () => {
	const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

	if (redirectUrl !== null) {
		return <Redirect push to={redirectUrl} />
	}

	return (
		<Grid container direction="column" justify="center" alignItems="center">
			<Grid item xs={3}>
				<Button 
					onClick={() => setRedirectUrl('/karaoke')}
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
<MuiThemeProvider theme={theme}><CssBaseline />
	<Router>
		<Route path="/remote" component={RemoteBase} />
		<Route path="/karaoke" component={KaraokeBase} />
		<Route path="/" exact component={AppSelector} />
	</Router>
</MuiThemeProvider>;

export default App;
