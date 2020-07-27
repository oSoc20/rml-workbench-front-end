import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  Typography,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

import { ComponentCategory } from '../../constants/componentCategory';
import { INPUT_CONFIG } from '../../constants/targets';
import { FormProps } from './ComponentForm';
import MyDialog from '../MyDialog';
import DropzoneAreaSources from '../DropZone';

const DEFAULT = {
  type: 'source',
  category: ComponentCategory.Source,
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
  }),
);

const SourceForm = ({ component, onClose, onUpdate }: FormProps) => {
  const classes = useStyles();
  const [data, setData] = useState({
    ...DEFAULT,
    ...component,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
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
            <InputLabel id="type">Type</InputLabel>
            <Select labelId="type" value={data.type} name="type" onChange={handleChange}>
              {Object.keys(INPUT_CONFIG).map((type) => (
                <MenuItem key={type} value={type}>
                  <div className={classes.item}>
                    <Typography>{INPUT_CONFIG[type].type}</Typography>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {data.type === 'file' ? <DropzoneAreaSources /> : <></>}
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

export default SourceForm;
