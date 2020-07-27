import React from 'react';
import Title from '../components/Title';
import { Theme, Typography, createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(4),
    },
  }),
);

interface ProjectTitleProps {
  onUpdate: any;
  title: string;
}

const ProjectTitle = ({ onUpdate, title }: ProjectTitleProps) => {
  const classes = useStyles();

  const handleUpdate = (title: string) => {
    onUpdate(title);
  };

  return (
    <div className={classes.root}>
      <Title name={title} onUpdate={handleUpdate} />
    </div>
  );
};

export default ProjectTitle;
