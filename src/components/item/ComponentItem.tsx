import * as React from 'react';

import { ComponentCategory } from '../../constants/componentCategory';
import ProcessorItem from './ProcessorItem';
import SourceItem from './SourceItem';
import TargetItem from './TargetItem';

export interface ComponentProps {
  component: any;
  index: number;
  onRemove: (id: number) => void;
  onUpdate: (data: any) => void;
}

const ComponentItem = (props: ComponentProps) => {
  const { category } = props.component;
  if (category === ComponentCategory.Target) {
    return <TargetItem {...props} />;
  } else if (category === ComponentCategory.Processor) {
    return <ProcessorItem {...props} />;
  } else if (category === ComponentCategory.Source) {
    return <SourceItem {...props} />;
  }
  return null;
};

export default ComponentItem;
