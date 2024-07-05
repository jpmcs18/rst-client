import CustomReturn from '../../models/client-model/CustomReturn';
import { toDateDisplay, toDateTimeDisplay, toTimeDisplay } from '../../helper';
type DateTimePickerType = 'date' | 'time' | 'datetime-local';
export default function CustomDateTimePicker({
  title,
  name,
  type,
  id,
  className,
  value,
  readonly,
  disabled,
  onChange,
}: {
  title: string;
  name?: string;
  type?: DateTimePickerType;
  id?: string;
  className?: string;
  value?: Date;
  readonly?: boolean | false;
  disabled?: boolean | false;
  onChange?: (data: CustomReturn) => void;
}) {
  return (
    <div className={'custom-input ' + className}>
      <label htmlFor={name}>{title}</label>
      <div className='input-container'>
        <input
          disabled={disabled}
          readOnly={readonly}
          type={type ?? 'time'}
          name={name}
          id={id}
          value={
            !value
              ? undefined
              : type === 'date'
              ? toDateDisplay(value)
              : type === 'time'
              ? toTimeDisplay(value)
              : toDateTimeDisplay(value)
          }
          className={type}
          onChange={(e) => {
            onChange?.({
              elementName: name ?? '',
              value: new Date(e.target.value),
            });
          }}
        />
      </div>
    </div>
  );
}
