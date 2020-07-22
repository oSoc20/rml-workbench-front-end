
import * as React from 'react';
import {
  Theme,
  createStyles,
  makeStyles,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

import {deepOrange, purple, teal} from "@material-ui/core/colors";
import {ComponentProps} from "./ComponentItem";
import {getRdfByExtension} from "../../utils/stringProcessing";
import DescriptionIcon from "@material-ui/icons/Description";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textConfig: {
      width: '30vw',
      margin: '0 auto',
    },
    deploy: {
      display: 'flex',
      alignItems: 'center',
      justifyCenter: 'center',
    },
    btnAdd: { paddingLeft: 0 },
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
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: purple[500],
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      paddingTop: theme.spacing(8),
    },
    sourcesTitle: {
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
      },
    },
    teal: { backgroundColor: teal[500] },
    textOrange: { color: deepOrange[500] },
    textPurple: { color: purple[500] },
    textTeal: { color: teal[500] },
  }),
);

const TargetItem = ({ component, onUpdate } : ComponentProps ) => {
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
