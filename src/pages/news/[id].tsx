import Loading from '@elements/Loading';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import WithAuth from '@lib/WithAuth';
import axios from 'axios';
import Cookies from 'js-cookie';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface ReadNewsProps {
  user: User,
  permissions: any,
}

function ReadNews() {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const router = useRouter();
  const id: any = router.query.id;
  const token = Cookies.get('token');
  const [news, setNews] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
    
  useEffect(() => {
    getNews();
  }, []);

  const createMarkup = (content: string) => {
    return {
      __html: content,
    }
  }

  const getNews = async () => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}news/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
    setNews(response.data);
    setIsLoading(false);
  };

  if (isLoading && news === null) {
    return <Loading />
  }
  
  if (!isLoading && news === null) {
    return <Error statusCode={404}/>
  }

  return (
    <LayoutWithSidebar title="Berita" user={user} permissions={permissions.list}>
      <div className="bg-white p-6 md:px-7 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <h2 className="text-4xl font-bold	text-black mb-2">{news.title}</h2>
        <p>{news.created_at}</p>
        <div dangerouslySetInnerHTML={createMarkup(news.content)} className='ck-content mt-2'></div>
      </div>
    </LayoutWithSidebar>  
  );
};


export default WithAuth(ReadNews, 'view news');