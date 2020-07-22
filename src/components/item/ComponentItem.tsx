import * as React from 'react';
import {ComponentCategory} from "../../constants/componentCategory";
import ProcessorItem from "./ProcessorItem";
import TargetItem from "./TargetItem";
import SourceItem from "./SourceItem";

export interface ComponentProps {
  onUpdate: (data: any) => void,
  onRemove: (id: number) => void,
  component: any;
  index: number,
}

const ComponentItem = (props : ComponentProps) => {
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
