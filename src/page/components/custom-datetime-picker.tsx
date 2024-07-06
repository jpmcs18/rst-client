import { useEffect, useRef, useState } from 'react';
import CustomReturn from '../../models/client-model/CustomReturn';
import CustomDropdown from './custom-dropdown';
type DateTimePickerType = 'date' | 'time' | 'datetime-local';
export default function CustomDateTimePicker({
  title,
  subTitle,
  name,
  id,
  className,
  value,
  onChange,
  required,
}: {
  title?: string;
  subTitle?: string;
  name?: string;
  type?: DateTimePickerType;
  id?: string;
  className?: string;
  value?: Date;
  readonly?: boolean | false;
  disabled?: boolean | false;
  placeholder?: string | undefined;
  onChange?: (data: CustomReturn) => void;
  required?: boolean;
}) {
  const months = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const [years, setYears] = useState<number[]>([]);
  const [days, setDays] = useState<number[]>([]);
  const oldDate = value ? new Date(value) : new Date();
  const month = useRef<number | undefined>(
    oldDate?.getMonth() ? oldDate.getMonth() + 1 : undefined
  );
  const day = useRef<number | undefined>(oldDate?.getDate());
  const year = useRef<number | undefined>(oldDate?.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(() => month.current);
  const [currentDay, setCurrentDay] = useState(() => day.current);
  const [currentYear, setCurrentYear] = useState(() => year.current);

  useEffect(
    () => {
      const firstYear = new Date().getFullYear();
      const lastYear = 1900;
      for (let x = firstYear; x > lastYear; x--) {
        setYears((year) => {
          return [...year!, x];
        });
      }
      return () => {
        setYears(() => []);
      };
    },
    //eslint-disable-next-line
    []
  );
  useEffect(() => {
    const firstDay = new Date(currentYear ?? 0, currentMonth ?? 0, 0).getDate();
    const lastDay = 1;
    for (let d = firstDay; d >= lastDay; d--) {
      setDays((day) => {
        return [...day!, d];
      });
    }

    return () => {
      setDays(() => []);
    };
  }, [currentMonth, currentYear]);
  useEffect(
    () => {
      onChange?.({
        elementName: name ?? '',
        value: new Date(
          currentYear ?? 0,
          (currentMonth ?? 0) - 1,
          currentDay ?? 0
        ),
      });
    },
    //eslint-disable-next-line
    [currentMonth, currentDay, currentYear]
  );

  return (
    <div className={'custom-input ' + (required && !value) + className}>
      {title && (
        <label className='input-title' htmlFor={name}>
          {title}
        </label>
      )}
      {subTitle && (
        <label className='input-subtitle' htmlFor={name}>
          {subTitle}
        </label>
      )}
      <div className='date-picker'>
        <CustomDropdown
          title='Month'
          selectorOnly={true}
          value={currentMonth}
          required={required}
          onChange={(ret) => {
            setCurrentMonth(() => ret.value);
          }}
          itemsList={months.map((x) => {
            return { key: x.toString(), value: x?.toString() };
          })}
        />
        <CustomDropdown
          title='Day'
          selectorOnly={true}
          value={currentDay}
          required={required}
          onChange={(ret) => {
            setCurrentDay(() => ret.value);
          }}
          itemsList={days.map((x) => {
            return { key: x.toString(), value: x?.toString() };
          })}
        />
        <CustomDropdown
          title='Year'
          selectorOnly={true}
          value={currentYear}
          required={required}
          onChange={(ret) => {
            setCurrentYear(() => ret.value);
          }}
          itemsList={years.map((x) => {
            return { key: x.toString(), value: x?.toString() };
          })}
        />
      </div>
    </div>
  );
}
