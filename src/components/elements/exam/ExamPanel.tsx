import * as OutlineIcon from '@elements/icon/Outline';
import convertMinutesToMilliseconds from '@utils/convertMinutesToMilliseconds';
import { useEffect } from 'react';
import Countdown from 'react-countdown';

interface ExamPanelProps {
  totalQuestions: number,
  examDuration: number,
  setExamDuration: Function,
}

const ExamPanel = ({ totalQuestions, examDuration, setExamDuration }: ExamPanelProps) => {
  useEffect(() => {
    // console.log(examDuration);
    
  }, []);

  return (
    <div className="bg-white shadow-md rounded-md mb-2 w-3/4 mx-auto px-6 py-4 flex justify-between">
      <div className="divide-x-2 divide-gray-200 flex w-1/2 space-x-4">
        <span className="cursor-pointer inline-flex items-center" onClick={() => console.log('clicked!')}>
          <OutlineIcon.Pause className="h-6 w-6 text-blue-400"/>
        </span>
        <div className="flex items-center pl-4 space-x-1">
          <OutlineIcon.Clock className="h-6 w-6 text-gray-500" />
          <p>
            <Countdown 
              date={Date.now() + convertMinutesToMilliseconds(examDuration)}
              daysInHours={true}
            />
          </p>
        </div>
        <div className="flex items-center pl-4 space-x-1">
          <p className="font-bold leading-5">Soal 2/{totalQuestions}</p>
        </div>
      </div>
    </div>
  );
};

export default ExamPanel;