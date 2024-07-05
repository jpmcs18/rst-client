import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import CustomReturn from '../../models/client-model/CustomReturn';
export default function CustomPassword({
  title,
  name,
  id,
  className,
  value,
  readonly,
  disabled,
  onChange,
  onKeyPress,
}: {
  title: string;
  name?: string;
  id?: string;
  className?: string;
  value?: string;
  readonly?: boolean | false;
  disabled?: boolean | false;
  onChange?: (data: CustomReturn) => void;
  onKeyPress?: (key: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  const [toggle, setToggle] = useState(true);
  return (
    <div className={'custom-input ' + className}>
      <label htmlFor={name}>{title}</label>
      <div className='input-container password-container'>
        <input
          disabled={disabled}
          readOnly={readonly}
          type={toggle ? 'password' : 'text'}
          name={name}
          id={id}
          value={value ?? ''}
          onChange={(e) =>
            onChange?.({ elementName: name ?? '', value: e.target.value })
          }
          onKeyUp={onKeyPress}
        />
        <div className='eye-container'>
          <FontAwesomeIcon
            icon={(toggle ? faEye : faEyeSlash) as IconProp}
            className='icon'
            onClick={() => {
              if (disabled || readonly) return;
              setToggle((prev) => !prev);
            }}
          />
        </div>
      </div>
    </div>
  );
}
