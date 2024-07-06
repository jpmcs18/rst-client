import CustomReturn from '../../models/client-model/CustomReturn';
export default function CustomTextArea({
  title,
  subTitle,
  name,
  lines,
  id,
  className,
  value,
  readonly,
  disabled,
  onChange,
  required,
}: {
  title?: string;
  subTitle?: string;
  name?: string;
  lines?: number;
  id?: string;
  className?: string;
  value?: string;
  readonly?: boolean | false;
  disabled?: boolean | false;
  onChange?: (data: CustomReturn) => void;
  required?: boolean;
}) {
  return (
    <div
      className={
        'custom-input custom-text-area ' +
        (required && !value && 'required ') +
        className
      }>
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
      <textarea
        disabled={disabled}
        readOnly={readonly}
        name={name}
        id={id}
        rows={lines ?? 2}
        value={value ?? ''}
        onChange={(e) =>
          onChange?.({ elementName: name ?? '', value: e.target.value })
        }
      />
    </div>
  );
}
