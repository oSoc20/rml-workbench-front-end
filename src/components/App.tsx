import * as React from 'react';
import { CssBaseline, MuiThemeProvider, createStyles, makeStyles } from '@material-ui/core';

import DashboardPage from '../pages/DashboardPage';
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
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <DashboardPage />
      </MuiThemeProvider>
    </div>
  );
};

export default App;
