interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string,
}

const Input = ({ label, ...props  }: InputProps) => {
  return (
    <>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">{ label }</label>
      <input {...props} className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" />
    </>  
  );
};

export default Input;