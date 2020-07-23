import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Theme,
  Toolbar,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

import logo from '../rml-io-dashboard.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      backgroundColor: grey[100],
    },
    brand: {
      marginRight: theme.spacing(8),
      [theme.breakpoints.down('xs')]: {
        marginRight: theme.spacing(2),
        margin: 0,
      },
      height: '100%',
    },
    itemLink: {
      display: 'flex',
      height: '100%',
      padding: theme.spacing(1),
      [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(1),
        margin: 0,
      },
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    navigation: {
      display: 'flex',
    },
    title: {
      flexGrow: 1,
      color: grey[800],
    },
  }),
);

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar} elevation={1}>
      <Toolbar>
        <a href="/#" className={classes.brand}>
          <Avatar alt="Logo" src={logo} className={classes.large} />
        </a>
        <Typography variant="h6" className={classes.title}>
          RML.io Dashboard
        </Typography>
        <nav
          role="navigation"
          id="navigation"
          className={classes.navigation}
          style={{ textTransform: 'uppercase' }}
        >
          <Link to="/" className={classes.itemLink}>
            Home
          </Link>
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
