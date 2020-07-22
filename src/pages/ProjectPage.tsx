import React from 'react';
import {
  Avatar,
  Button,
  Divider,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import { redirectTo } from '../services/history';
import logo from '../rml-io-dashboard.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
    paper: {
      marginTop: theme.spacing(32),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
);

const onNewProject = () => {
  redirectTo('/dashboard');
};
const onOpenProject = () => {
  console.log('Open Project!');
};

const Project = () => {
  const classes = useStyles();
  return (
    <div className={classes.paper}>
      <Avatar alt="Logo" src={logo} className={classes.large} />
      <Typography component="h1" variant="h5" gutterBottom>
        RML.io Dashboard
      </Typography>
      <Divider variant="middle" />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onNewProject}
        startIcon={<AddIcon />}
      >
        New Project
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={onOpenProject}
        startIcon={<FolderOpenIcon />}
      >
        Open Project
      </Button>
    </div>
  );
};

export default Project;
