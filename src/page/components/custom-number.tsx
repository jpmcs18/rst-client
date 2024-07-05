import { useEffect, useRef } from 'react';
import { toCommaSeparated } from '../../helper';
import CustomReturn from '../../models/client-model/CustomReturn';

export default function CustomNumber({
  title,
  name,
  id,
  className,
  value,
  type,
  readonly,
  placeholder,
  disabled,
  onChange,
  onInputBlur,
}: {
  title?: string;
  name?: string;
  id?: string;
  className?: string;
  type: 'amount' | 'number';
  value?: number;
  placeholder?: string;
  readonly?: boolean | false;
  disabled?: boolean | false;
  onChange?: (data: CustomReturn) => void;
  onInputBlur?: () => void;
}) {
  const input = useRef<HTMLInputElement>(null);

  useEffect(
    () => {
      if (input.current) {
        input.current.value = !value ? '0' : toCommaSeparated(value.toString());
        if (!input.current.value.endsWith('.00') && type === 'amount') {
          input.current.value += '.00';
        }
      }
    },
    //eslint-disable-next-line
    [value]
  );

  function formatCurrency(isBlur: boolean) {
    if (input.current === null) return;
    if (
      input.current.value.startsWith('0') &&
      input.current.value.indexOf('.') === -1
    ) {
      input.current.value = (+input.current.value).toString();
    }
    var inputData = input.current.value;
    var length = inputData.length;
    var selectionStart = input.current.selectionStart;
    var indexOfDecimal = inputData.indexOf('.');
    if (indexOfDecimal >= 0) {
      var wholeNumber = inputData.substring(0, indexOfDecimal);
      var decimalPoint = inputData.substring(indexOfDecimal + 1);
      wholeNumber = toCommaSeparated(wholeNumber);
      if (isBlur && !decimalPoint.length) {
        decimalPoint += '00';
      }
      inputData = wholeNumber + '.' + decimalPoint;
    } else {
      inputData = toCommaSeparated(inputData);
      if (type === 'amount') {
        if (isBlur) {
          if (inputData === '') inputData = '0';
          inputData += '.00';
        }
      }
    }
    var newLength = inputData.length;
    input.current.value = inputData;
    selectionStart = newLength - length + (selectionStart ?? 0);
    input.current.setSelectionRange(selectionStart, selectionStart);
    if (isBlur) {
      if (inputData) {
        onChange?.({
          elementName: name ?? '',
          value: +inputData.replaceAll(',', ''),
        });
      }

      onInputBlur?.();
    }
  }

  return (
    <div className={'custom-input ' + className}>
      <label htmlFor={name}>{title}</label>
      <input
        className='custom-number'
        disabled={disabled}
        readOnly={readonly}
        ref={input}
        placeholder={placeholder}
        type='text'
        name={name}
        id={id}
        onChange={(e) => {
          formatCurrency(false);
        }}
        onBlur={() => {
          formatCurrency(true);
        }}
      />
    </div>
  );
}
