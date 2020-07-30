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
      width: theme.spacing(30),
      marginLeft: theme.spacing(16),
    },
  }),
);

interface TitleProps {
  name: any;
  onUpdate: any;
  tooltip?: string;
}

const Title = ({ name, onUpdate, tooltip }: TitleProps) => {
  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const [title, setTitle] = useState(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleCloseEditing = () => {
    setEditing(false);
    setTitle(name);
  };

  const handleEditTitle = () => {
    setEditing(true);
  };

  const handleSaveTitle = () => {
    setEditing(false);
    if (title.length !== 0 && title.length < 31) {
      onUpdate(title.trim());
    } else {
      setTitle(name);
    }
  };

  if (isEditing) {
    return (
      <div className={classes.root}>
        <TextField
          name="name"
          placeholder={name}
          value={title}
          onChange={handleChange}
          className={classes.textField}
          inputProps={{ maxLength: 30 }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSaveTitle();
              event.preventDefault();
            }
          }}
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
          {name}
          {tooltip && (
            <Tooltip title={tooltip}>
              <sup className={classes.areaExplaination}>?</sup>
            </Tooltip>
          )}
        </Button>
      </div>
    );
  }
};

export default Title;
