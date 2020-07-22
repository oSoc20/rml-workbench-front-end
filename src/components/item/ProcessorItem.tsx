import * as React from 'react';
import {
  Theme,
  createStyles,
  makeStyles,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import MapIcon from '@material-ui/icons/Map';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import ClearIcon from '@material-ui/icons/Clear';
import { deepOrange } from '@material-ui/core/colors';
import { ComponentProps } from './ComponentItem';
import { capitalizeFirstLetter } from '../../utils/stringProcessing';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    textOrange: { color: deepOrange[500] },
  }),
);

const ProcessorItem = ({ component, onUpdate, onRemove, index }: ComponentProps) => {
  const classes = useStyles();

  return (
    <ListItem
      button={true}
      key={`${component.category}_${component.id}`}
      disableGutters={true}
      onClick={() => onUpdate(component)}
      className={`${component.category}${component.id}`}
    >
      <ListItemAvatar>
        <Avatar className={classes.orange}>
          {component.type === 'mapper' ? <MapIcon /> : <TrackChangesIcon />}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.textOrange}
        primary={`${capitalizeFirstLetter(component.category)} ${index + 1}`}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => onRemove(component.id)}>
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
      {/*processor.sources.map((source: any) => (
        <LineTo
          from={source}
          to={'processor' + processor.id}
          fromAnchor="center right"
          toAnchor="-5% 50%"
          borderColor="black"
          borderWidth={2}
          delay={100}
        />
      ))*/}
    </ListItem>
  );
};

export default ProcessorItem;
