import React from 'react';
import CustomReturn from '../../models/client-model/CustomReturn';

export default function CustomCheckBox({
  isChecked,
  onChange,
  id,
  text,
  name,
}: {
  onChange?: (ret: CustomReturn) => void;
  isChecked: boolean;
  id?: string;
  text?: string;
  name?: string;
}) {
  return (
    <div className='check'>
      <label className='check-container'>
        <input
          type='checkbox'
          id={id ?? 'check'}
          onChange={() =>
            onChange?.({
              elementName: name ?? 'def',
              value: !isChecked,
            })
          }
          checked={isChecked}
        />
        <span className='checkmark'></span>
      </label>
      {text && (
        <label className='check-label' htmlFor={id ?? 'check'}>
          {text}
        </label>
      )}
    </div>
  );
}
