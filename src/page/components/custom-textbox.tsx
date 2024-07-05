import CustomReturn from '../../models/client-model/CustomReturn';
export default function CustomTextBox({
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
  title?: string;
  name?: string;
  id?: string;
  className?: string;
  value?: string;
  readonly?: boolean | false;
  disabled?: boolean | false;
  onChange?: (data: CustomReturn) => void;
  onKeyPress?: (key: React.KeyboardEvent<HTMLDivElement>) => void;
}) {
  return (
    <div className={'custom-input ' + className}>
      <label htmlFor={name}>{title}</label>
      <input
        disabled={disabled}
        readOnly={readonly}
        type='text'
        name={name}
        id={id}
        value={value ?? ''}
        onChange={(e) =>
          onChange?.({ elementName: name ?? '', value: e.target.value })
        }
        onKeyUp={onKeyPress}
      />
    </div>
  );
}
