import { useEffect, useRef, useState } from 'react';
import { longMonths } from '../../helper';
import CustomReturn from '../../models/client-model/CustomReturn';
import CustomDropdown from './custom-dropdown';
export default function CustomDateTimePicker({
  title,
  subTitle,
  name,
  id,
  className,
  value,
  onChange,
  required,
  type,
}: {
  title?: string;
  subTitle?: string;
  name?: string;
  id?: string;
  className?: string;
  value?: Date;
  readonly?: boolean | false;
  disabled?: boolean | false;
  placeholder?: string | undefined;
  onChange?: (data: CustomReturn) => void;
  required?: boolean;
  type?: 'date' | 'time' | 'datetime';
}) {
  const months = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const hours = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  const [years, setYears] = useState<number[]>([]);
  const [days, setDays] = useState<number[]>([]);
  const [minutes, setMinutes] = useState<number[]>([]);
  const oldDate = value ? new Date(value) : new Date();

  const month = useRef<number | undefined>(
    oldDate?.getMonth() ? oldDate.getMonth() + 1 : undefined
  );
  const day = useRef<number | undefined>(oldDate?.getDate());
  const year = useRef<number | undefined>(oldDate?.getFullYear());
  const hour = useRef<number | undefined>(
    (oldDate?.getHours() ?? 0) - ((oldDate?.getHours() ?? 0) > 12 ? 12 : 0)
  );
  const minute = useRef<number | undefined>(oldDate?.getMinutes());
  const ampm = useRef<number | undefined>(
    (oldDate?.getHours() ?? 0) >= 12 ? 2 : 1
  );

  const [currentMonth, setCurrentMonth] = useState(() => month.current);
  const [currentDay, setCurrentDay] = useState(() => day.current);
  const [currentYear, setCurrentYear] = useState(() => year.current);
  const [currentHour, setCurrentHour] = useState(() => hour.current);
  const [currentMinute, setCurrentMinute] = useState(() => minute.current);
  const [currentAMPM, setCurrentAMPM] = useState(() => ampm.current);

  useEffect(
    () => {
      const firstYear = new Date().getFullYear();
      const lastYear = 1900;
      for (let x = firstYear; x > lastYear; x--) {
        setYears((year) => {
          return [...year!, x];
        });
      }
      for (let x = 59; x >= 0; x--) {
        setMinutes((minute) => {
          return [...minute!, x];
        });
      }
      return () => {
        setYears(() => []);
        setMinutes(() => []);
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
          currentDay ?? 0,
          +(currentHour ?? 0) +
            (+(currentAMPM ?? 1) === 1 || +(currentHour ?? 0) === 12 ? 0 : 12),
          currentMinute ?? 0,
          0,
          0
        ),
      });
    },
    //eslint-disable-next-line
    [
      currentMonth,
      currentDay,
      currentYear,
      currentHour,
      currentMinute,
      currentAMPM,
    ]
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
      {(type === 'date' || type === 'datetime') && (
        <div className='date-picker'>
          <CustomDropdown
            title='Month'
            removeFiltering={true}
            selectorOnly={true}
            value={currentMonth}
            required={required}
            onChange={(ret) => {
              setCurrentMonth(() => ret.value);
            }}
            itemsList={months.map((x) => {
              return { key: x.toString(), value: longMonths[x - 1] };
            })}
          />
          <CustomDropdown
            title='Day'
            removeFiltering={true}
            selectorOnly={true}
            value={currentDay}
            required={required}
            onChange={(ret) => {
              setCurrentDay(() => ret.value);
            }}
            itemsList={days.map((x) => {
              return {
                key: x.toString(),
                value: x?.toString()?.padStart(2, '0'),
              };
            })}
          />
          <CustomDropdown
            title='Year'
            removeFiltering={true}
            selectorOnly={true}
            value={currentYear}
            required={required}
            onChange={(ret) => {
              setCurrentYear(() => ret.value);
            }}
            itemsList={years.map((x) => {
              return {
                key: x.toString(),
                value: x?.toString()?.padStart(2, '0'),
              };
            })}
          />
        </div>
      )}
      {(type === 'time' || type === 'datetime') && (
        <div className='date-picker'>
          <CustomDropdown
            title='Hour'
            removeFiltering={true}
            selectorOnly={true}
            value={currentHour}
            required={required}
            onChange={(ret) => {
              setCurrentHour(() => ret.value);
            }}
            itemsList={hours.map((x) => {
              return {
                key: x.toString(),
                value: x.toString()?.padStart(2, '0'),
              };
            })}
          />
          <CustomDropdown
            title='Minute'
            removeFiltering={true}
            selectorOnly={true}
            value={currentMinute}
            required={required}
            onChange={(ret) => {
              setCurrentMinute(() => ret.value);
            }}
            itemsList={minutes.map((x) => {
              return {
                key: x.toString(),
                value: x?.toString()?.padStart(2, '0'),
              };
            })}
          />
          <CustomDropdown
            title='-'
            removeFiltering={true}
            selectorOnly={true}
            value={currentAMPM}
            required={required}
            onChange={(ret) => {
              setCurrentAMPM(() => ret.value);
            }}
            itemsList={[
              { key: '1', value: 'AM' },
              { key: '2', value: 'PM' },
            ]}
          />
        </div>
      )}
    </div>
  );
}
