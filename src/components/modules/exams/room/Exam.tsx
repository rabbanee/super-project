import Layout from '@layouts/Layout';
import * as Button from '@elements/Button';
import * as OutlineIcon from '@elements/icon/Outline';
import Option from '@elements/exam/Option';
import Quiz from '@interface/Quiz';
import ExamInterface from '@interface/Exam';
import ExamQuestionMap from '@elements/exam/ExamQuestionMap';

interface ExamProps {
  exam: ExamInterface,
  answers: Array<any>,
  setAnswers: Function,
  examDuration: number,
  // setExamDuration: Function,
}

const Exam = ({ exam, answers, setAnswers, examDuration }: ExamProps) => {

  const optionHandler = (key: string, quiz: Quiz) => {
    const filteredAnswers = answers.filter((answer) => answer.quizId !== quiz.id);
    setAnswers([
      ...filteredAnswers, {
      quizId: quiz.id,
      answer: {
        [key]: quiz.options[key],
      }
    }]);
  }

  const essayHandler = (e: any, quiz: Quiz) => {
    const filteredValue = e.target.value.trim();
    const filteredAnswers = answers.filter((answer) => answer.quizId !== quiz.id);
    if (!filteredValue && !filteredAnswers) return;
    if (!filteredValue && filteredAnswers) {
      setAnswers([...filteredAnswers]);
      return;
    }
    setAnswers([
      ...filteredAnswers, {
      quizId: quiz.id,
      answer: {
        essay: filteredValue,
      }
    }]);
  }

  return (
    <Layout title="Ruang Ujian" className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="flex space-x-2 w-full relative">
        <div className="w-3/4 flex space-y-4 flex-col">
          {
            exam.quizzes.map((quiz, quizIndex) => 
              <div className="bg-white rounded-md shadow-sm" key={quizIndex} id={`quizId-${quiz.id}`}>
                <div className="px-6 py-5 w-full">
                  <p>Soal {quizIndex + 1}/{exam.totalQuestions}</p>
                  <h2 className="mt-2 font-bold text-2xl">{quiz.question}</h2>
                </div>
                {
                  quiz.isMultipleChoice ? ( 
                  <ul>
                    {
                      Object.keys(quiz.options).map(key => 
                        <Option key={`${key}-${quiz.id}`} option={quiz.options[key]} quizId={quiz.id} label={key} onClick={() => optionHandler(key, quiz)} />
                      )
                    }
                  </ul>
                  ) : 
                   <div className="box border rounded flex flex-col shadow bg-white mx-6 mb-4">
                    <div className="bg-gray-100 px-3 py-2 border-b">
                      <h3 className="text-sm text-grey-darker font-medium">Jawaban</h3>
                    </div>
                    <textarea className="text-grey-darkest flex-1 p-2 m-1 bg-transparent focus:outline-none" onChange={(e) => essayHandler(e, quiz)}></textarea>
                  </div>
                }
              </div>
            )
          }
        </div>
        <ExamQuestionMap answers={answers} quizzes={exam.quizzes} examDuration={examDuration} />
      </div>
    </Layout>
  );
};

export default Exam;