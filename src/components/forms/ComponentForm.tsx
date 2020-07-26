import * as React from 'react';
import { ComponentCategory } from '../../constants/componentCategory';
import ProcessorForm from './ProcessorForm';

export interface FormProps {
  onClose: () => void;
  onUpdate: (data: any) => void;
  component: any;
}

const ComponentForm = (props: FormProps) => {
  const { category } = props.component;
  if (category === ComponentCategory.Processor) {
    return <ProcessorForm {...props} />;
  } else if (category === ComponentCategory.Source) {
    return null;
  }
  return null;
};

export default ComponentForm;
