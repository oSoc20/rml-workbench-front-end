import * as React from 'react';
import MyDialog from '../MyDialog';
import { FormProps } from './ComponentForm';
import { useState } from 'react';
import { ComponentCategory } from '../../constants/componentCategory';
import DropzoneAreaSources from '../DropZone';

const DEFAULT = {
  type: 'source',
  category: ComponentCategory.Source,
  config: '',
};

const SourceForm = ({ component, onUpdate, onClose }: FormProps) => {
  const [data /*setData*/] = useState({
    ...DEFAULT,
    ...component,
  });
  /*
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };*/

  const handleSave = () => {
    onUpdate({
      ...data,
    });
  };

  return (
    <MyDialog
      content={
        <>
          <DropzoneAreaSources />
        </>
      }
      onClose={onClose}
      onSave={handleSave}
      open={true}
      save="Save"
      title={'Source config'}
    />
  );
};

export default SourceForm;
