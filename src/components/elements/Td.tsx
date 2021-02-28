interface ThProps extends React.TdHTMLAttributes<any> {
  children: any,
  className?: string,
}

const Td = ({ children, className, ...props  }: ThProps) => {
  return (
    <td className={`px-6 py-4 text-left font-medium tracking-wider text-sm text-gray-900 ${className && className}`} { ...props  }>{ children }</td>
  );
};

export default Td;