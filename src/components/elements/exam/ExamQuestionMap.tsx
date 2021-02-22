import Quiz from '@interface/Quiz';
import React, { useState } from 'react';
import { Link } from 'react-scroll'
import * as OutlineIcon from '@elements/icon/Outline';
import Countdown from 'react-countdown';
import convertMinutesToMilliseconds from '@utils/convertMinutesToMilliseconds';

interface ExamQuestionMapProps {
  quizzes: Array<Quiz>,
  answers: Array<any>,
  examDuration: number,
}

const ExamQuestionMap = ({ quizzes, answers, examDuration }: ExamQuestionMapProps) => {
  let [date, setDate] = useState(Date.now() + convertMinutesToMilliseconds(examDuration));

  return (
   <div className="bg-white w-1/4 p-6 rounded-md max-h-96 sticky top-0">
      <div className="flex flex-col space-y-2 border-b border-gray-200 pb-3">
        <div className="flex bg-gray-100 px-1 py-2 rounded">
          <span className="cursor-pointer inline-flex items-center" onClick={() => console.log('clicked!')}>
            <OutlineIcon.Pause className="h-6 w-6 text-blue-400"/>
          </span>
          <div className="flex items-center pl-4 space-x-1">
            <OutlineIcon.Clock className="h-6 w-6 text-gray-500" />
            <p>
              <Countdown 
                date={date}
                daysInHours={true}
              />
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex space-x-1 items-center">
            <div className="w-4 h-4 border rounded-full bg-gray-200"></div>
            <p>Terjawab</p>
          </div>
          <div className="flex space-x-1 items-center">
            <div className="w-4 h-4 border rounded-full bg-white"></div>
            <p>Belum dijawab</p>
          </div>
        </div>
      </div>
      <div className="mt-2 flex space-x-3 flex-wrap px-5">
        {
         quizzes.map((quiz, quizIndex) => 
         <Link to={`quizId-${quiz.id}`} spy={true} smooth={true} key={quizIndex} className={`w-12 focus:outline-none relative h-12 border-2 border-gray-200 rounded-full ${answers.find((answer) => answer.quizId === quiz.id)  && 'bg-gray-200'} items-center justify-center flex cursor-pointer`}>
            { quizIndex + 1 }
          </Link>
          )
        }
        {/* <button className="w-12 h-12 border-2 border-blue-200 rounded-full opacity- items-center justify-center flex relative">
          <span className="w-full bg-blue-200 opacity-40 absolute inset-0 rounded-full"></span>
          2
        </button>
        <button className="w-12 h-12 border-2 border-gray-200 rounded-full items-center justify-center flex">
          3
        </button> */}
      </div>
    </div>
  );
};

export default ExamQuestionMap;