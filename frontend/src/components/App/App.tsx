import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React, { FC } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import KaraokeBase from '../KaraokeBase';
import RemoteBase from '../RemoteBase';

const theme = createMuiTheme({
	palette: {
		type: 'dark',
	},
	typography: { useNextVariants: true },
});

const App: FC<{}> = () => <MuiThemeProvider theme={theme}><CssBaseline />
	<Router>
		<Route path="/remote" component={RemoteBase} />
		<Route path="/karaoke" component={KaraokeBase} />
	</Router>
</MuiThemeProvider>;

export default App;
