import Skeleton from 'react-loading-skeleton';


const NewsCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-600 shadow-lg w-full rounded-t-lg rounded-b-lg">
      <div className="h-44 w-full rounded-t-lg overflow-hidden">
        <Skeleton height={180} />
      </div>
      <div className="p-4">
        <p className="text-sm flex space-x-1">
          <Skeleton />
        </p>
        <h3 className="text-xl font-bold dark:text-gray-100 text-gray-800 mb-2 truncate"><Skeleton /></h3>
        <Skeleton />
      </div>
    </div>
  );
};

export default NewsCardSkeleton;