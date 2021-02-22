import convertMinutesToMilliseconds from '@utils/convertMinutesToMilliseconds';
import prettyMilliseconds from 'pretty-ms';
import React, { useEffect, useRef, useState } from 'react';

interface TimerProps {
  duration: number,
  isCountDown: boolean,
  isOn: boolean,
  setDuration: Function,
}

const Timer = ({ duration, isCountDown, isOn, setDuration }: TimerProps) => {
  const [time, setTime] = useState(duration);
  let intervalRef: any = useRef();

  useEffect(() => {
    startTime();  
  }, []);

  const startTime = () => {
    if (duration === 0) {
      return () => clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setDuration(() => convertMinutesToMilliseconds(duration) - 1000);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }

  const  stopTimer = () => {
    console.log("stop")
  }
  const resetTimer = () => {
     console.log("reset")
  }

  return (
    <>
      {prettyMilliseconds(duration)}
    </>
  );
};

export default Timer;