interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset",
  disabled?: boolean,
}

const defaultClass: string = 'py-2 px-4 text-sm font-medium rounded-md focus:outline-none';

export const Primary = ({ children, ...props }: ButtonProps) => (
  <button
    {...props}
    className={`${defaultClass} bg-primary hover:bg-primary-darkest text-white focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark border border-transparent ${props.className && props.className}`}
  >
    { children }
  </button>
);

export const Danger = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${defaultClass} bg-red-600 hover:bg-red-700 text-white focus:ring-2 focus:ring-offset-2 focus:ring-red-500 border border-transparent ${props.className && props.className}`}
    >
      { children }
    </button>
  );
};

export const Secondary = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`${defaultClass} bg-white hover:bg-gray-50 text-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary border border-gray-300 ${props.className && props.className}`}
    >
      { children }
    </button>
  );
};