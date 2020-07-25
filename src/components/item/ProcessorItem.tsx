import * as React from 'react';
import {
  Avatar,
  Theme,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import ClearIcon from '@material-ui/icons/Clear';
import MapIcon from '@material-ui/icons/Map';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

import { ComponentProps } from './ComponentItem';
import { Targets } from '../../constants/targets';
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

const ProcessorItem = ({ component, index, onRemove, onUpdate }: ComponentProps) => {
  const classes = useStyles();

  const displayTarget = (ext: string) => {
    let tmp = Object.values(Targets).filter((target) => target.extension === `.${ext}`);
    return `${tmp[0].name} file`;
  };

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
        secondary={displayTarget(component.target)}
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
