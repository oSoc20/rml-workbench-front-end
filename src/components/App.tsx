import * as React from 'react';
import { Router } from 'react-router-dom';
import { CssBaseline, MuiThemeProvider, createStyles, makeStyles } from '@material-ui/core';
import RouteHandler from '../routes/RouteHandler';
import history from '../services/history';
import theme from '../theme';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
  }),
);

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <RouteHandler />
        </MuiThemeProvider>
      </Router>
    </div>
  );
};

export default App;
