import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

interface NewsProps {
  date?: string, 
  title?: string, 
  description?: string, 
  imageId: string,
  id: string,
}

const NewsCard = ({ date, title, description, imageId, id, }: NewsProps) => {
  return (
    <div className="bg-white dark:bg-gray-600 shadow-lg w-full rounded-t-lg rounded-b-lg">
      <div className="h-44 w-full rounded-t-lg overflow-hidden">
        <img src={`${process.env.NEXT_PUBLIC_API_HOST}images/${imageId}`} alt="News" className=" inline-block"/>
      </div>
      <div className="p-4">
        <p className="text-sm flex space-x-1">
          <span className="text-primary font-bold mr-1 dark:text-primary-dark">BERITA</span> 
          <span className="mr-1 dark:text-gray-100">{date}</span>  
        </p>
        <h3 className="text-xl font-bold dark:text-gray-100 text-gray-800 mb-2 truncate">{ title }</h3>
        {/* <p className="truncate dark:text-gray-100">
          { description }
        </p> */}
        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}news/${id}`}>
          <a className="px-3 py-1 bg-primary-light text-gray-50 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-white focus:ring-offset-2 hover:bg-primary-dark">
            Baca
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;