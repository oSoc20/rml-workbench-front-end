import React from 'react';
import LineTo from 'react-lineto';

interface LineProps {
  sourceID: string;
  processorID: string;
}

const Line = ({ sourceID, processorID }: LineProps) => {
  console.log(sourceID + ' ' + processorID);
  return (
    <LineTo
      to={`source${sourceID}`}
      from={`processor${processorID}`}
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
