import React from 'react';
import LineTo from 'react-lineto';

interface LineProps {
  sourceId: string;
  processorId: string;
}

const Line = ({ sourceId, processorId }: LineProps) => {
  return (
    <LineTo
      to={`source${sourceId}`}
      from={`processor${processorId}`}
      fromAnchor="-5% 50%"
      toAnchor="center right"
      borderColor="black"
      borderWidth={2}
      delay={100}
      zIndex={99}
    />
  );
};

export default Line;
