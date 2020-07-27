import * as React from 'react';

import { ComponentCategory } from '../../constants/componentCategory';
import ProcessorItem from './ProcessorItem';
import SourceItem from './SourceItem';

export interface ComponentProps {
  component: any;
  index: number;
  onRemove: (id: number) => void;
  onUpdate: (data: any) => void;
}

const ComponentItem = (props: ComponentProps) => {
  props.component.files.map((file) => {
    console.log(file.name);
  });
  const { category } = props.component;
  if (category === ComponentCategory.Processor) {
    return <ProcessorItem {...props} />;
  } else if (category === ComponentCategory.Source) {
    return <SourceItem {...props} />;
  }
  return null;
};

export default ComponentItem;
