interface ThProps extends React.ThHTMLAttributes<any> {
  children: any,
  className?: string,
}

const Th = ({ children, className, ...props }: ThProps) => {
  return (
    <th scope="col" className={`px-6 py-3 text-left font-medium text-gray-50 tracking-wider ${className && className}`}  { ...props }>
      { children  }
    </th>
  );
};

export default Th;