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
import { DropzoneArea } from 'material-ui-dropzone';

const DEFAULT = {
  type: 'file',
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
  const [isDisabled, setDisabled] = useState(true);

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

  const handleChangeFiles = (file) => {
    setData({
      ...data,
      file: file,
    });
    file.length > 0 ? setDisabled(false) : setDisabled(true);
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
          {data.type === 'file' ? (
            <DropzoneArea
              dropzoneText={'Drag and drop a source file here or click'}
              showFileNames
              filesLimit={1}
              onChange={handleChangeFiles}
              acceptedFiles={INPUT_CONFIG[data.type].acceptedFileExtensions}
            />
          ) : (
            <></>
          )}
        </>
      }
      onClose={onClose}
      onSave={handleSave}
      open={true}
      disabledSave={isDisabled}
      save="Save"
      title={
        <>
          <AccountTreeIcon /> Source file
        </>
      }
    />
  );
};

export default SourceForm;
