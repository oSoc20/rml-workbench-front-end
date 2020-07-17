import * as React from 'react';
import { Theme, Tooltip, Typography, createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    areaExplaination: {
      color: theme.palette.primary.main,
      cursor: 'help',
      fontSize: theme.spacing(2),
    },
  }),
);

interface TitleProps {
  title: string;
  tooltip: string;
}

const Title = (props: TitleProps) => {
  const classes = useStyles();
  const { title, tooltip } = props;
  return (
    <Typography variant="h4" component="h2">
      {title}
      <Tooltip title={tooltip}>
        <sup className={classes.areaExplaination}>?</sup>
      </Tooltip>
    </Typography>
  );
};

export default Title;
