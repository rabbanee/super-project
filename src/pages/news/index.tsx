import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { User } from '@interface/User';
import NewsCard from '@modules/NewsCard';
import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import NewsContainer from '@elements/container/News';
import * as Button from '@elements/Button';
import * as SolidIcon from '@elements/icon/Solid';
import Link from 'next/link';
import Title from '@elements/Title';
import findPermissionByName from '@utils/findPermissionByName';
import usePermissions from '@lib/usePermissions';
import { useDispatch, useSelector } from 'react-redux';
import WithAuth from '@lib/WithAuth';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import initialDataWithPagination from '@data/initial-data-with-pagination';
import NewsCardSkeleton from '@elements/NewsCardSkeleton';
import Pagination from '@modules/Pagination';
interface NewsProps { 
  user: User,
  permissions: any,
}

function News() {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const token = Cookies.get('token');
  const [news, setNews] = useState(initialDataWithPagination);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getNews();
  }, []);  

  const getNews = async (page = 1) => {
    setIsLoading(true);
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}news?page=${page}`, {
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

  const onCurrentPageChange = ({ currentPage }) => getNews(currentPage);

  return (
    <LayoutWithSidebar title="Berita" user={user} permissions={permissions.list}>
      <Container>
        <ContainerBody className="rounded-b-xl">
          <div className="flex justify-between items-start">
            <Title className=" mb-2">Berita</Title>
            { findPermissionByName(permissions.list, 'crud news') &&
              <Link href={`/news/management`}>
                <a className="btn btn-primary inline-flex items-center">
                  <SolidIcon.Adjustments className="-ml-1 mr-1 h-5 w-5" />
                  Pengelolaan Berita
                </a>
              </Link>
            }
          </div>
          {
            isLoading && 
            <NewsContainer>
              {
                Array.apply(1, Array(4)).map((value, i) => 
                  <NewsCardSkeleton key={i}/>
                )
              }
            </NewsContainer>
          }
          {
            (news?.data?.length > 0 && !isLoading) &&  
              <>
                <NewsContainer className="mb-4">
                  {
                    news?.data?.map((newsItem: any) => 
                      <NewsCard key={newsItem?.id} date={newsItem?.created_at} title={newsItem?.title} description={newsItem?.content} imageId={newsItem?.image?.id} id={newsItem?.id}/>
                    )
                  }
                </NewsContainer>
                <Pagination totalShow={news?.data?.length} currentPage={news?.current_page} total={news?.total} lastPage={news?.last_page} perPage={news?.per_page} onCurrentPageChange={onCurrentPageChange} />
              </>
          }
          {
            (news?.data?.length === 0 && !isLoading) &&
            <div className="flex justify-center flex-col items-center">
              <img src="images/no-data.png" alt="No data" className="h-80 w-80"/>
              <p>Tidak ada data</p>
            </div>
          }
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  );
}

export default WithAuth(News, 'view news');
