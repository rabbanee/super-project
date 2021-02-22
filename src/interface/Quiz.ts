interface Quiz {
  id: number,
  question: string,
  options?: {
    a: string,
    b: string,
    c: string,
    d: string,
  },
  isMultipleChoice: boolean,
}

export default Quiz;