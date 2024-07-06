import React from 'react';

export default function CustomDisplay({
  title,
  value,
  isBold,
}: {
  title: string;
  value: any;
  isBold?: boolean;
}) {
  return (
    <div className='custom-display'>
      <div className='title'>{title}</div>
      <div className={'value ' + (isBold ? 'bold-style' : '')}>{value}</div>
    </div>
  );
}
