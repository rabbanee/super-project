const findGradeByGradeName = (grades: Array<any>, gradeName: string) => grades.find(grade => grade.name === gradeName);
export default findGradeByGradeName;