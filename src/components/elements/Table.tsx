interface TableProps {
  children: any,
  color?: string,
  className?: string, 
}

const Table = ({ children, color, className  }: TableProps) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 mt-2">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6">
          <div className={`shadow overflow-hidden rounded-lg ${className && className}`}>
            <table className={`min-w-full divide-y divide-${color}`}>
              { children  }
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;