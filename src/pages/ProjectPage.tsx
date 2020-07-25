import moment from 'moment';
import React, { useState } from 'react';
import {
  Button,
  Divider,
  Fade,
  List,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import ProjectItem from '../components/item/ProjectItem';
import { redirectTo } from '../services/history';
import { getProjects, saveProjects } from '../utils/ProjectStorage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    list: {
      width: '100%',
      maxWidth: 500,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 290,
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: theme.spacing(32),
    },
  }),
);

const displayProject = (project: any) => {
  const projectId = project.id.split('_')[1];
  const timestamp = moment(Number(project.createdAt)).valueOf();
  return `Project: ${projectId} (${moment(timestamp).fromNow()})`;
};

const handleNewProject = () => {
  // const newId = `project_${new Date().getTime()}`;
  // saveProject(newId, {
  //   ...PROJECT_DEFAULT,
  //   createdAt: new Date().getTime(),
  //   id: newId,
  // });
  redirectTo('untitled/dashboard');
};

const handleOpenProject = (project: any) => {
  redirectTo(`${project.id}/dashboard`);
};

const Project = () => {
  const classes = useStyles();
  const [projects, setProjects] = useState(getProjects());

  const handleRemoveProject = (project: any) => {
    let tmp = Object.entries(projects).filter(([value]) => value !== project.id);
    let tmpToObject = Object.fromEntries(tmp);
    setProjects(tmpToObject);
    saveProjects(tmpToObject);
  };

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" gutterBottom>
        RML.io Dashboard
      </Typography>
      <List className={classes.list}>
        {Object.keys(projects).map((project: any, index: number) => (
          <Fade in={true} key={index} timeout={(index + 1) * 400}>
            <div>
              <ProjectItem
                name={displayProject(projects[project])}
                onClick={() => handleOpenProject(projects[project])}
                onRemove={() => handleRemoveProject(projects[project])}
              />
              <Divider variant="inset" component="li" light />
            </div>
          </Fade>
        ))}
      </List>
      <Divider />
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleNewProject}
        startIcon={<AddIcon />}
      >
        New Project
      </Button>
    </div>
  );
};

export default Project;
