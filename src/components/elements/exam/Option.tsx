const Option = ({ option, label, onClick, quizId, checked }) => {
  return (
     <li>
      <input id={`${label}-${quizId}`} type="radio" name={quizId} className="hidden" defaultChecked={checked} />
      <label htmlFor={`${label}-${quizId}`} className="flex items-center py-3 w-full hover:bg-blue-100 h-full px-6 cursor-pointer" onClick={onClick}>
        <span className={`w-8 h-8 inline-flex items-center justify-center mr-2 rounded-full flex-shrink-0 border border-gray-200 after-label-checked:border-blue-400 shadow after-label-checked:bg-blue-400 bg-gray-200 after-label-checked:text-white`}>{label.toUpperCase()}</span>
        {option}
      </label>
    </li>
  );
};

export default Option;