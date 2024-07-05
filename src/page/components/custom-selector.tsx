import { faClose, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export default function CustomSelector({
  title,
  name,
  id,
  className,
  value,
  readonly,
  disabled,
  onSelectorClick,
  onClear,
}: {
  title: string;
  name?: string;
  id?: string;
  className?: string;
  value?: string;
  readonly?: boolean | false;
  disabled?: boolean | false;
  onSelectorClick?: () => void;
  onClear?: () => void;
}) {
  return (
    <div className={'custom-input ' + className}>
      <label htmlFor={name}>{title}</label>
      <div className='input-container selector'>
        <input
          disabled={disabled}
          readOnly={true}
          type='text'
          name={name}
          id={id}
          value={value ?? ''}
        />
        <div className='icon-container'>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className='icon'
            onClick={() => {
              if (disabled || readonly) return;
              onSelectorClick?.();
            }}
          />
          <FontAwesomeIcon
            icon={faClose}
            className='close-icon'
            onClick={() => {
              if (disabled || readonly) return;
              onClear?.();
            }}
          />
        </div>
      </div>
    </div>
  );
}
