interface TableProps {
  children: any,
  color?: string,
  className?: string, 
}

const Table = ({ children, color, className  }: TableProps) => {
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-2">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className={`shadow overflow-hidden border-b border-${color} rounded-xl ${className && className}`}>
          <table className={`min-w-full divide-y divide-${color}`}>
            { children  }
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;