import { InputHTMLAttributes, useState } from 'react';

interface TimeInputProps extends InputHTMLAttributes<HTMLInputElement> {
  initialTime?: string,
  onTimeChange?: Function,
}

const TimeInput = ({ initialTime = '', onTimeChange = null, ...props }: TimeInputProps) => {
  const [lastValue, setLastValue] = useState('');
  const [time, setTime] = useState(initialTime);

  const onChangeHandler = (value: string) => {
    if (value === time) return;

    if (!isValid(value)) return;

    if (value.length === 2 && lastValue.length !== 3 && value.indexOf(':') === -1) value = value + ':';

    if (value.length === 2 && lastValue.length === 3) value = value.slice(0, 1);

    if (value.length > 5) return false;
    
    setLastValue(value);
    setTime(value);

    if (value.length === 5 && onTimeChange !== null) onTimeChange(value);
  }


  const isValid = (val: string): Boolean =>  {
    const regexp = /^\d{0,2}?\:?\d{0,2}$/;
    
    const [hoursStr, minutesStr] = val.split(':');
    
    if (!regexp.test(val)) false;

    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    const isValidHour = (hour) => Number.isInteger(hour) && hour >= 0 && hour < 24;
    const isValidMinutes = (minutes) => (Number.isInteger(minutes) && hours >= 0 && hours < 24) || Number.isNaN(minutes);
    if (!isValidHour(hours) || !isValidMinutes(minutes)) return false;

    if (minutes < 10 && Number(minutesStr[0]) > 5) return false;

    const valArr = val.indexOf(':') !== -1
        ? val.split(':')
        : [val];

    // check mm and HH
    if (valArr[0] && valArr[0].length && (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 23)) return false;

    if (valArr[1] && valArr[1].length && (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)) return false;

    return true;
  }

  return (
    <input 
      {...props}
      onChange={(e) => onChangeHandler(e.target.value)}
      value={time}
    />
  );
};

export default TimeInput;