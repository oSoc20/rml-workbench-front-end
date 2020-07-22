import * as React from 'react';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import DescriptionIcon from '@material-ui/icons/Description';

import { ComponentProps } from './ComponentItem';
import { getRdfByExtension } from '../../utils/stringProcessing';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItemText: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      minWidth: 200,
      maxWidth: 200,
      [theme.breakpoints.up('sm')]: {
        maxWidth: 400,
      },
      [theme.breakpoints.up('sm')]: {
        maxWidth: 200,
      },
    },
    teal: { backgroundColor: teal[500] },
    textTeal: { color: teal[500] },
  }),
);

const TargetItem = ({ component, onUpdate }: ComponentProps) => {
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
        <Avatar className={classes.teal}>
          <DescriptionIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText className={classes.listItemText}>
        <Typography
          component="span"
          variant="body2"
          className={classes.textTeal}
          color="textPrimary"
        >
          {getRdfByExtension(component.target).name}
        </Typography>
      </ListItemText>
      {/* <LineTo
        from={'processor' + processor.id}
        to={'target' + processor.id}
        fromAnchor="center right"
        toAnchor="-5% 50%"
        borderColor="black"
        borderWidth={2}
        delay={100}
      /> */}
    </ListItem>
  );
};

export default TargetItem;
