const defaultClass: string = `group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none`;
const primary = (props: any) => {
  return (
      <button 
      type="submit"
      className={`${defaultClass} bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${props.className && props.className}`}
      disabled={props.disabled}>
        { props.children }      
      </button>
  );
}

export { primary };