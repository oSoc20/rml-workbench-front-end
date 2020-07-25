import React, { useState } from 'react';
import { Avatar, createStyles, makeStyles, TextField, Theme } from '@material-ui/core';

import { ComponentCategory } from '../../constants/componentCategory';
import { FormProps } from './ComponentForm';
import MyDialog from '../MyDialog';
import DescriptionIcon from '@material-ui/icons/Description';
import { deepOrange } from '@material-ui/core/colors';
import { Targets } from '../../constants/targets';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

const DEFAULT = {
  type: 'mapper',
  target: 'ttl',
  category: ComponentCategory.Processor,
  config: '',
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: '100%',
      marginBottom: theme.spacing(2),
    },
    item: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: theme.spacing(0.5),
    },
    avatar: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      marginRight: theme.spacing(2),
      backgroundColor: deepOrange[500],
      color: theme.palette.getContrastText(deepOrange[500]),
    },
  }),
);

const ProcessorForm = ({ component, onClose, onUpdate }: FormProps) => {
  const classes = useStyles();

  const [data, setData] = useState({
    ...DEFAULT,
    ...component,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = () => {
    onUpdate({
      ...data,
    });
  };

  return (
    <MyDialog
      children={
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="target">Target</InputLabel>
            <Select labelId="target" value={data.target} name="target" onChange={handleChange}>
              {Object.keys(Targets).map((target) => (
                <MenuItem key={target} value={target}>
                  <div className={classes.item}>
                    <Avatar className={classes.avatar}>
                      <DescriptionIcon />
                    </Avatar>
                    <Typography>
                      {Targets[target].name} ({Targets[target].extension})
                    </Typography>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            autoFocus
            variant="outlined"
            id="name"
            label="Config"
            multiline
            size="medium"
            name="config"
            rows={30}
            value={data.config}
            onChange={handleChange}
            fullWidth
          />
        </>
      }
      onClose={onClose}
      onSave={handleSave}
      open={true}
      save="Save"
      title={
        <>
          <AccountTreeIcon /> Mappings config
        </>
      }
    />
  );
};

export default ProcessorForm;
