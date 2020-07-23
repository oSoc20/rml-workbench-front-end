import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

import { ComponentCategory } from '../../constants/componentCategory';
import { FormProps } from './ComponentForm';
import MyDialog from '../MyDialog';

const DEFAULT = {
  type: 'mapper',
  category: ComponentCategory.Processor,
  config: '',
};

const ProcessorForm = ({ component, onClose, onUpdate }: FormProps) => {
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
      title={'Mappings config'}
    />
  );
};

export default ProcessorForm;
