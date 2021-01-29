const danger = (props : any) => {
  return (
    <div className="bg-red-100 px-4 py-2 rounded flex items-start">
      <span className="text-red-400 mr-2 leading-5">
        <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" fillRule="evenodd"></path></svg>
      </span>
      <div className="">
        <p className="leading-5 font-bold text-base text-red-600">There is an Error</p>
       <ul className="list-disc ml-5 font-semibold">
         <li className="leading-normal text-red-500 text-base">
           { props.description }
         </li>
       </ul>
      </div>
    </div>
  );
};

export { danger };