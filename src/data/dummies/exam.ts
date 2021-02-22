import Exam from "@interface/Exam";
const dummyExam: Exam = {
  maxDuration: 60,
  totalQuestions: 4,
  currentDuration: 60,
  quizzes: [
    {
      id: 1,
      question: 'Bagian atom yang bermuatan negatif adalah',
      options: {
        a: 'Proton',
        b: 'Elektron',
        c: 'Neutron',
        d: 'Aufbau',
      },
      isMultipleChoice: true,
    },
    {
      id: 2,
      question: 'Bagian atom yang bermuatan netral adalah',
      options: {
        a: 'Proton',
        b: 'Elektron',
        c: 'Neutron',
        d: 'Aufbau',
      },
      isMultipleChoice: true,
    },
    {
      id: 3,
      question: 'Bagian atom yang bermuatan positif adalah',
      options: {
        a: 'Proton',
        b: 'Elektron',
        c: 'Neutron',
        d: 'Aufbau',
      },
      isMultipleChoice: true,
    },
    {
      id: 4,
      question: 'Konfigurasi elektron dari unsur Ar18',
      isMultipleChoice: false,
    },
  ],
};

export default dummyExam;