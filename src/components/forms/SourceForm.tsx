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
  type: 'source',
  category: ComponentCategory.Source,
  source: '',
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

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const SourceForm = ({ component, onClose, onUpdate }: FormProps) => {
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

  //TODO: remove the if and change dropzone so it has a "onSave" instead of "onChange"
  const handleChangeFiles = async (file) => {
    let base64File;
    if (file.length === 0) {
      base64File = '';
    } else {
      base64File = await toBase64(file[0]);
      base64File = base64File.split(',')[1];
    }
    setData({
      ...data,
      filename: file[0]?.name,
      source: base64File,
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
          {data.type === 'file' ? (
            <DropzoneArea
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
