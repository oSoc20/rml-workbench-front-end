import React, { useState } from 'react';
import { Button, Theme, TextField, Tooltip, createStyles, makeStyles } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    areaExplaination: {
      color: theme.palette.primary.main,
      cursor: 'help',
      fontSize: theme.spacing(2),
    },
    button: {
      fontSize: '1.5625em',
    },
    root: {
      minHeight: theme.spacing(8),
    },
    textField: {
      marginLeft: theme.spacing(16),
    },
  }),
);

interface TitleProps {
  column: any;
  onUpdate: any;
  tooltip: string;
}

const Title = (props: TitleProps) => {
  const classes = useStyles();
  const { column, onUpdate, tooltip } = props;

  const [isEditing, setEditing] = useState(false);
  const [title, setTitle] = useState(column.name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCloseEditing = () => {
    setEditing(false);
    setTitle(column.name);
  };

  const handleEditTitle = () => {
    setEditing(true);
  };

  const handleSaveTitle = () => {
    setEditing(false);
    if (title.length !== 0 && title.length < 20) {
      const data = { ...column };
      data.name = title;
      onUpdate(data);
    } else {
      setTitle(column.name);
    }
  };

  if (isEditing) {
    return (
      <div className={classes.root}>
        <TextField
          name="name"
          placeholder={column.name}
          value={title}
          onChange={handleChange}
          className={classes.textField}
          inputProps={{ maxLength: 20 }}
        />
        <Button onClick={handleCloseEditing}>
          <ClearIcon />
        </Button>
        <Button color="primary" onClick={handleSaveTitle}>
          <CheckIcon />
        </Button>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Button className={classes.button} onClick={() => handleEditTitle()}>
          {column.name}
          <Tooltip title={tooltip}>
            <sup className={classes.areaExplaination}>?</sup>
          </Tooltip>
        </Button>
      </div>
    );
  }
};

export default Title;
