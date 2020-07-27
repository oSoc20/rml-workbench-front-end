import React from 'react';
import Title from '../components/Title';

interface ColumnTitleProps {
  column: any;
  onUpdate: any;
  tooltip: string;
}

const ColumnTitle = ({ column, onUpdate, tooltip }: ColumnTitleProps) => {
  const handleUpdate = (title: string) => {
    const data = { ...column };
    data.name = title;
    onUpdate(data);
  };

  return <Title name={column.name} onUpdate={handleUpdate} tooltip={tooltip} />;
};

export default ColumnTitle;
