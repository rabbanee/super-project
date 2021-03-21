import * as Button from '@elements/Button';
import * as SolidIcon from '@elements/icon/Solid';

type PaginationProps = {
  from?: number,
  to?: number,
  total?: number,
  currentPage?: number,
  lastPage?: number,
  perPage?: number,
  onCurrentPageChange: Function,
}

const Pagination = ({ from, to, total, currentPage, lastPage, perPage, onCurrentPageChange }: PaginationProps) => {

  const onPreviousHandler = (e) => {
    e.preventDefault();
   if (currentPage <= 1) {
     return;
   }
   onCurrentPageChange({
     currentPage: currentPage - 1,
   });
  }

  const onNextHandler = (e) => {
    e.preventDefault();
    if (currentPage === lastPage) {
      return;
    }
    onCurrentPageChange({
      currentPage: currentPage + 1,
    });
  }

  const linksHandler = (e, pageNumber) => {
    e.preventDefault();
    if (pageNumber === currentPage) return;
    onCurrentPageChange({
      currentPage: pageNumber,
    });
  };

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <Button.Secondary>Sebelumnya</Button.Secondary>
        <Button.Secondary>Selanjutnya</Button.Secondary>
        {/* <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
          Previous
        </a>
        <a href="#" className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
          Next
        </a> */}
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Menampilkan
            <span className="font-medium"> { total < perPage  ? total : perPage } </span>
            data
            dari
            <span className="font-medium"> { total } </span>
            data
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px flex-wrap" aria-label="Pagination">
            <a href="#" onClick={onPreviousHandler} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Sebelumnya</span>
                {/* Heroicon name: solid/chevron-left */}
                <SolidIcon.ChevronLeft className="h-5 w-5"/>
            </a>
            {
              Array.apply(1,  Array(lastPage)).map((number, i) => 
                <a onClick={(e) => linksHandler(e, i+1)} key={`page-${i+1}`} href="#"  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium  ${currentPage === i+1 ?  'bg-primary-darkest text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}>
                  { i+1 }
                </a>
              )
            }
            {/* <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              2
            </a>
            <a href="#" className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a href="#" className="hidden md:inline-flex relative items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              8
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              9
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              10
            </a> */}
            <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" onClick={onNextHandler}>
              <span className="sr-only">Selanjutnya</span>
              {/* Heroicon name: solid/chevron-right */}
              <SolidIcon.ChevronRight className="h-5 w-5"/>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;