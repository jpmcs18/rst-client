import React from 'react';

export default function CustomRangeSlider({
  title,
  className,
  min,
  max,
  step,
  value,
  onChange,
}: {
  title?: string;
  className?: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (num: number) => void;
}) {
  return (
    <div className='custom-input'>
      {title && <label className='input-title'>{title}</label>}
      <div className='slider-container'>
        <input
          type='range'
          className={className}
          min={min}
          max={max}
          title={value.toString()}
          step={step}
          value={value}
          onChange={(e) => {
            onChange(Number(e.target.value));
          }}
        />
        <label className='current-value'>{value}</label>
        <label className='min-value'>{min}</label>
        <label className='max-value'>{max}</label>
      </div>
    </div>
  );
}
