import * as React from 'react';
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
    listItem: {
      textAlign: 'right',
    },
  }),
);

interface ProjectItemProps {
  name: string;
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  onRemove: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ProjectItem = (props: ProjectItemProps) => {
  const classes = useStyles();
  const { name, onClick, onRemove } = props;
  return (
    <ListItem button onClick={onClick}>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText className={classes.listItem} primary={name} />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={onRemove}>
          <DeleteIcon className={classes.deleteIcon} />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ProjectItem;
