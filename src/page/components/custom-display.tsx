import React from 'react';

export default function CustomDisplay({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className='custom-display'>
      <label className='display-title'>{title}</label>
      <div className='display-value'>{value ? value : 'N/A'}</div>
    </div>
  );
}
