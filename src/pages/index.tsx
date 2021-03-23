import WithAuth from '@lib/WithAuth';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { User } from '@interface/User';
import NewsCard from '@modules/NewsCard';
import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import NewsContainer from '@elements/container/News';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import findPermissionByName from '@utils/findPermissionByName';
import { useDispatch, useSelector } from 'react-redux';
import initialDataWithPagination from '@data/initial-data-with-pagination';
import axios from 'axios';
import convertDate from '@utils/convertDate';
import SkeletonAnnouncementTable from '@modules/SkeletonAnnouncementTable';
import NewsCardSkeleton from '@elements/NewsCardSkeleton';
import NoData from '@elements/NoData';

function Home() {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const [announcements, setAnnouncements] = useState(initialDataWithPagination);
  const token = Cookies.get('token');
  const [news, setNews] = useState(initialDataWithPagination);
  const [isLoading, setIsLoading] = useState(false);
  const [isGettingNews, setIsGettingNews] = useState(false);

  useEffect(() => {
    getAnnouncement();
    getNews();
  }, []);

  const getNews = async (page = 1) => {
    setIsGettingNews(true);
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}news?per_page=2&page=${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
    setNews(response.data);
    setIsGettingNews(false);
  };

  const getAnnouncement = async () => {
    let response: any;
    setIsLoading(true);
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}announcement?per_page=2`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      setIsLoading(false);
      return error;
    }
    setAnnouncements(response.data);
    setIsLoading(false);
  };

  const createMarkup = (description: string) => {
    return {
      __html: description,
    }
  }

  return (
    <LayoutWithSidebar title="Beranda" user={user} permissions={permissions.list}>
      <div className="bg-white dark:bg-gray-700 p-6 md:px-7 rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <div className="z-10 relative">
          <h2 className="text-5xl font-bold	text-black mb-2 dark:text-gray-100">Halo, {user.name}</h2>
          <p className="text-2xl dark:text-gray-100">Selamat Datang</p>
        </div>
        <div className="bg-hola bg-left w-80 h-52 bg-cover opacity-75 bg-no-repeat absolute top-0 right-0 md:w-96 md:h-56" aria-label="hola image"></div>
      </div>
      {
        findPermissionByName(permissions.list, 'view announcement') && (
          <Container className="mt-5">
            <ContainerBody className="rounded-b-xl">
              <h2 className="text-4xl font-bold	text-black mb-2 dark:text-gray-100">Pengumuman</h2>
              {
                (!isLoading && announcements?.data?.length === 0) && 
                <NoData />
              }
              {
                isLoading && <SkeletonAnnouncementTable />
              }
              {
                !isLoading &&
                announcements?.data?.map((announcement) => 
                  <div key={announcement.id} className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto mb-2">
                    <table className="table table-borderless tab mt-2">
                      <tbody>
                        <tr>
                          <th className="w-1/4">Judul</th>
                          <th className="w-1/4">:</th>
                          <td>{announcement.title}</td>
                        </tr>
                        <tr>
                          <th className="w-1/4">Pembuat pengumuman</th>
                          <th className="w-1/4">:</th>
                          <td>{announcement.user.name}</td>
                        </tr>
                        <tr>
                          <th className="w-1/4">Tanggal</th>
                          <th className="w-1/4">:</th>
                          <td>{convertDate(announcement.created_at)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <hr className="mt-2"/>
                    <div dangerouslySetInnerHTML={createMarkup(announcement.description)} className='ck-content mt-2'></div>
                  </div>
                )
              }
            </ContainerBody>
          </Container>
        ) 
      }
      {
        findPermissionByName(permissions.list, 'view news') && (
          <Container className="mt-5">
            <ContainerBody className="rounded-b-xl">
              <h2 className="text-4xl font-bold	text-black mb-2 dark:text-gray-100">Berita</h2>
               {
                  isGettingNews && 
                  <NewsContainer>
                    {
                      Array.apply(1, Array(2)).map((value, i) => 
                        <NewsCardSkeleton key={i}/>
                      )
                    }
                  </NewsContainer>
                }
                {
                  (news?.data?.length > 0 && !isGettingNews) &&  
                    <>
                      <NewsContainer className="mb-4">
                        {
                          news.data.map((newsItem: any) => 
                            <NewsCard key={newsItem.id} date={newsItem.created_at} title={newsItem.title} description={newsItem.content} imageId={newsItem?.image?.id} id={newsItem.id}/>
                          )
                        }
                      </NewsContainer>
                    </>
                }
                {
                  (news?.data?.length === 0 && !isGettingNews) && <NoData />
                }
            </ContainerBody>
          </Container>
        ) 
      }
    </LayoutWithSidebar>
  )
}

export default WithAuth(Home);
