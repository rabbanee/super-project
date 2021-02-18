interface ThProps extends React.TdHTMLAttributes<any> {
  children: any,
  className?: string,
}

const Td = ({ children, className, ...props  }: ThProps) => {
  return (
    <td className={`px-6 py-3 text-left font-medium tracking-wider ${className && className}`} { ...props  }>{ children }</td>
  );
};

export default Td;