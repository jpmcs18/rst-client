import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import CustomReturn from '../../models/client-model/CustomReturn';
export default function CustomPassword({
  title,
  subTitle,
  name,
  id,
  className,
  value,
  readonly,
  disabled,
  onChange,
  onKeyPress,
  placeholder,
  required,
}: {
  title: string;
  subTitle?: string;
  name?: string;
  id?: string;
  className?: string;
  value?: string;
  readonly?: boolean | false;
  disabled?: boolean | false;
  placeholder?: string;
  onChange?: (data: CustomReturn) => void;
  onKeyPress?: (key: React.KeyboardEvent<HTMLDivElement>) => void;
  required?: boolean;
}) {
  const [toggle, setToggle] = useState(true);
  return (
    <div className={'custom-input ' + (required && !value && 'required ')}>
      {title && (
        <label className='input-title' htmlFor={name}>
          {title} {required && <span className='required'>REQUIRED</span>}
        </label>
      )}
      {subTitle && (
        <label className='input-subtitle' htmlFor={name}>
          {subTitle}
        </label>
      )}
      <div className='input-container'>
        <input
          disabled={disabled}
          readOnly={readonly}
          className={'password ' + className}
          type={toggle ? 'password' : 'text'}
          name={name}
          id={id}
          value={value ?? ''}
          placeholder={placeholder}
          onChange={(e) =>
            onChange?.({ elementName: name ?? '', value: e.target.value })
          }
          onKeyDown={onKeyPress}
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
