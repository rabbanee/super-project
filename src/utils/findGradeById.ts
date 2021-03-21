const findGradeById = (grades: Array<any>, gradeId: string) => grades.find(grade => grade.id === gradeId);
export default findGradeById;