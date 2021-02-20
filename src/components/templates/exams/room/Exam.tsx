import Layout from '@layouts/Layout';
import * as Button from '@elements/Button';
import * as OutlineIcon from '@elements/icon/Outline';
import { useState } from 'react';
import Option from '@elements/exam/Option';

const Exam = ({ exam, answers, setAnswers }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const optionHandler = (key) => {
    const filteredAnswers = answers.filter((answer) => answer.quizId !== exam.quizzes[currentQuestion-1].id);
    console.log('terfiter', filteredAnswers);
    
    setAnswers([
      ...filteredAnswers, {
      quizId: exam.quizzes[currentQuestion-1].id,
      answer: {
        [key]: exam.quizzes[currentQuestion-1].options[key],
      }
    }]);
  }

  const onPreviousQuestion = () => setCurrentQuestion(currentQuestion-1);
  const onNextQuestion = () => setCurrentQuestion(currentQuestion+1);

  const isChecked = (label) => {
    console.log('isChecked jalan');
    
    const findAnswer = answers.find((answer) => {
      return exam.quizzes[currentQuestion-1].id === answer && label === Object.keys(answer)[0]
    });
    return findAnswer;
  }

  return (
    <Layout title="Ruang Ujian" className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="bg-white shadow-md rounded-md mb-2 w-3/4 mx-auto px-6 py-4 flex justify-between">
        <div className="divide-x-2 divide-gray-200 flex w-1/2 space-x-4">
          <span className="cursor-pointer inline-flex items-center" onClick={() => console.log('clicked!')}>
            <OutlineIcon.Pause className="h-6 w-6 text-blue-400"/>
          </span>
          <div className="flex items-center pl-4 space-x-1">
            <OutlineIcon.Clock className="h-6 w-6 text-gray-500" />
            <p>00:25:09</p>
          </div>
          <div className="flex items-center pl-4 space-x-1">
            <p className="font-bold leading-5">Soal {currentQuestion}/{exam.totalQuestions}</p>
          </div>
        </div>
        <Button.Primary className="w-64 rounded-2xl" onClick={onNextQuestion} type="button">
          Selanjutnya
        </Button.Primary>
      </div>
      <div className="flex space-y-3 w-full flex-col">
        <div className="flex space-x-2 w-full">
          <div className="bg-white w-3/4 rounded-md shadow-sm">
            <div className="px-6 py-5 w-full">
              <h2 className="mt-2 font-bold text-2xl">{exam.quizzes[currentQuestion-1].question}</h2>
            </div>
            <ul>
              {
                Object.keys(exam.quizzes[currentQuestion-1].options).map(key => 
                  <Option key={`${key}-${exam.quizzes[currentQuestion-1].id}`} option={exam.quizzes[currentQuestion-1].options[key]} quizId={exam.quizzes[currentQuestion-1].id} label={key} onClick={() => optionHandler(key)} checked={() => isChecked(key)}/>
                )
              }
            </ul>
          </div>
          <div className="bg-white w-1/4 p-6 rounded-md">
            <div className="flex space-x-2 border-b border-gray-200 pb-3">
              <div className="flex space-x-1 items-center">
                <div className="w-4 h-4 border rounded-full bg-gray-200"></div>
                <p>Terjawab</p>
              </div>
              <div className="flex space-x-1 items-center">
                <div className="w-4 h-4 border rounded-full bg-white"></div>
                <p>Belum dijawab</p>
              </div>
              <div className="flex space-x-1 items-center">
                <div className="w-4 h-4 border rounded-full bg-blue-200"></div>
                <p>Saat ini</p>
              </div>
            </div>
            <div className="mt-2 flex space-x-3 flex-wrap px-5">
             {
                Array.apply(1, Array(exam.totalQuestions)).map((e, i) => 
                  <button key={i} className={`w-12 focus:outline-none relative h-12 border-2 border-gray-200 rounded-full ${i+1 === currentQuestion ? 'border-blue-200' : '' } items-center justify-center flex`}>
                    { 
                      i+1 === currentQuestion ? (
                        <span className="w-full bg-blue-200 opacity-40 absolute inset-0 rounded-full"></span>
                      ) : ''
                    }
                    { i + 1 }
                  </button>
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
        </div>
        <div className="flex space-x-2 w-full">
          <div className={`w-3/4 flex ${currentQuestion > 1 ? 'justify-between' : 'justify-end'}`}>
            {
              currentQuestion > 1 &&  <Button.Secondary className="w-64 rounded-2xl" onClick={onPreviousQuestion}>
                Sebelumnya
              </Button.Secondary>
            }
            {
              currentQuestion !== exam.totalQuestions &&  <Button.Primary className="w-64 rounded-2xl" onClick={onNextQuestion}>
                Selanjutnya
              </Button.Primary>
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Exam;