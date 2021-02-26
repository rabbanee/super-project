interface Quiz {
  id: number,
  question: string,
  options?: {
    a: string,
    b: string,
    c: string,
    d: string,
  },
  trueAnswer: string,
  subject: string,
  grade: string,
  isChecked: boolean,
  isMultipleChoice: boolean,
}

export default Quiz;