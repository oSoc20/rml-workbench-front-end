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
  // important, start with current column name
  const [title, setTitle] = useState(column.name);

  const handleSaveTitle = () => {
    const data = { ...column };
    data.name = title;
    onUpdate(data);
    setEditing(false);
  };

  const handleEditTitle = () => {
    setEditing(true);
  };

  const handleCloseEditing = () => {
    setTitle(column.name);
    setEditing(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  if (isEditing) {
    return (
      <div>
        <TextField name="name" placeholder={column.name} value={title} onChange={handleChange} />
        <Button color="primary" onClick={handleCloseEditing}>
          <ClearIcon />
        </Button>
        <Button color="primary" onClick={handleSaveTitle}>
          <CheckIcon />
        </Button>
      </div>
    );
  } else {
    return (
      <Button className={classes.button} onClick={() => handleEditTitle()}>
        {column.name}
        <Tooltip title={tooltip}>
          <sup className={classes.areaExplaination}>?</sup>
        </Tooltip>
      </Button>
    );
  }
};

export default Title;
