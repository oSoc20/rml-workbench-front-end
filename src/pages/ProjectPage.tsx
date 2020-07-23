import React from 'react';
import { Button, Divider, Theme, Typography, createStyles, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { redirectTo } from '../services/history';
import {getProjects, saveProject} from "../utils/ProjectStorage";
import {Columns} from "../constants/columns";
import {ComponentCategory} from "../constants/componentCategory";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    paper: {
      marginTop: theme.spacing(32),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
);


const CONFIG_DEFAULT = {
  download: true,
  execute: false,
};

const COLUMNS_DEFAULT = [
  {
    id: new Date().getTime(),
    name: Columns[ComponentCategory.Source].title,
    category: ComponentCategory.Source,
    components: [],
  },
  {
    id: new Date().getTime() + 1, // or unique hash in future
    name: Columns[ComponentCategory.Processor].title,
    category: ComponentCategory.Processor,
    components: [],
  },
];

const PROJECT_DEFAULT = {
  columns: [...COLUMNS_DEFAULT.map((col) => ({ ...col }))],
  config: {...CONFIG_DEFAULT},
};

const handleNewProject = () => {
  const newId = `project_${new Date().getTime()}`;
  saveProject(newId, {
    ...PROJECT_DEFAULT,
    createdAt: new Date().getTime(),
    id: newId,
  });

  redirectTo(`${newId}/dashboard`);
};
const handleOpenProject = (project) => {
  redirectTo(`${project.id}/dashboard`);
};

const Project = () => {
  const classes = useStyles();

  const projects = getProjects();

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" gutterBottom>
        RML.io Dashboard
      </Typography>

      {
        Object.keys(projects)
          .map((id) => (
            <button onClick={() => handleOpenProject(projects[id])}>{id}<br />{projects[id].createdAt}</button>
          ))
      }

      <Divider variant="middle" />
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
