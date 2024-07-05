import CustomReturn from '../../models/client-model/CustomReturn';

export default function CustomCheckBoxButton({
  title,
  CheckedTitle,
  UncheckedTitle,
  name,
  id,
  className,
  isCheck,
  disabled,
  onChange,
}: {
  title?: string;
  CheckedTitle: string;
  UncheckedTitle: string;
  name?: string;
  id?: string;
  className?: string;
  isCheck: boolean;
  disabled?: boolean;
  onChange?: (data: CustomReturn) => void;
}) {
  return (
    <div className={'custom-input ' + className}>
      <label htmlFor={name}>{title}</label>
      <div className='checkbox-button'>
        <button
          disabled={disabled}
          className={
            'btn-check check-true' + (isCheck ? ' checked' : ' unchecked')
          }
          id={id}
          onClick={() => {
            if (isCheck) return;
            onChange?.({ elementName: name ?? '', value: true });
          }}>
          {CheckedTitle}
        </button>
        <button
          disabled={disabled}
          className={
            'btn-check check-false' + (!isCheck ? ' checked' : ' unchecked')
          }
          id={id}
          onClick={() => {
            if (!isCheck) return;
            onChange?.({ elementName: name ?? '', value: false });
          }}>
          {UncheckedTitle}
        </button>
      </div>
    </div>
  );
}