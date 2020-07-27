import * as React from 'react';
import { formatDistanceToNow } from 'date-fns';
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() =>
  createStyles({
    deleteIcon: {
      color: red[300],
    },
  }),
);

interface ProjectItemProps {
  project: any;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProjectItem = ({ project, onClick, onRemove }: ProjectItemProps) => {
  const classes = useStyles();
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={project.name}
        secondary={`${formatDistanceToNow(Number(project.createdAt))} ago`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={onRemove}>
          <DeleteIcon className={classes.deleteIcon} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ProjectItem;
