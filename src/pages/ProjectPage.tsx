import moment from 'moment';
import React from 'react';
import {
  Button,
  Divider,
  List,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { redirectTo } from '../services/history';
import { getProjects, saveProject, saveProjects } from '../utils/ProjectStorage';
import ProjectItem from '../components/item/ProjectItem';
import { Columns } from '../constants/columns';
import { ComponentCategory } from '../constants/componentCategory';

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
  config: { ...CONFIG_DEFAULT },
};

const displayProject = (project: any) => {
  const projectId = project.id.split('_')[1];
  const timestamp = moment(Number(project.createdAt)).valueOf();
  return `Project: ${projectId} (${moment(timestamp).fromNow()})`;
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

const handleOpenProject = (project: any) => {
  redirectTo(`${project.id}/dashboard`);
};

const handleRemoveProject = (project: any) => {
  let projects = getProjects();
  projects = Object.entries(projects).filter(function (item) {
    return item['id'] !== project.id;
  });
  // TODO make it works
};

const Project = () => {
  const classes = useStyles();
  const projects = getProjects();
  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h5" gutterBottom>
        RML.io Dashboard
      </Typography>
      <List>
        {Object.keys(projects).map((project) => (
          <ProjectItem
            name={displayProject(projects[project])}
            onClick={() => handleOpenProject(projects[project])}
            onRemove={() => handleRemoveProject(projects[project])}
          />
        ))}
      </List>
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
