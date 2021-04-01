import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import Table from '@elements/Table';
import Td from '@elements/Td';
import Th from '@elements/Th';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import ConfirmationModal from '@modules/ConfirmationModal';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import * as SolidIcon from '@elements/icon/Solid';
import * as Button from '@elements/Button';
import Pagination from '@modules/Pagination';
import Title from '@elements/Title';
import InputWithIcon from '@modules/InputWithIcon';
import WithAuth from '@lib/WithAuth';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import axios from 'axios';
import initialDataWithPagination from '@data/initial-data-with-pagination';
import SkeletonTable from '@modules/SkeletonTable';
import { showAlert } from '@actions/index';

const NewsManagement = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get('token');
  const [news, setNews] = useState(initialDataWithPagination);
  const searchInputRef = useRef<HTMLInputElement>();
  const [selectedNewsId, setSelectedNewsId] = useState(null);
  const dispatch: Function = useDispatch();

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async (page = 1) => {
    let response;
    setIsLoading(true);
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}news?=page${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
    setNews(response.data);
    setIsLoading(false);
  };

  const searchNews = async (query, page = 1) => {
    let response;
    if (!query.trim()) { 
      getNews();
      return;
    }
    setIsLoading(true);
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}news/search/${query}?=page${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
    setNews(response.data);
    setIsLoading(false);
  };
  
  const onCurrentPageChange = ({ currentPage }) => searchInputRef.current.value ? searchNews(searchInputRef.current.value, currentPage) : getNews(currentPage);

  const destroyNews = async (e) => {
    let response; 
    console.log('hai');
    try {
      response = await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}news/${selectedNewsId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
    } catch (error) {
      console.log(error);
      return error;
    }
    setIsConfirmationModalShow(false);
    getNews();
    dispatch(showAlert({
      title: 'Berhasil menghapus berita!',
      type: 'success'
    }));
  };

  const deleteNews = async (newsId: number) => {
    setIsConfirmationModalShow(true);
    setSelectedNewsId(newsId);
  };
  
  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Berita" description="Apakah Anda yakin ingin menghapus berita ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" onConfirm={destroyNews} />
      <LayoutWithSidebar title="Pengelolaan Berita" user={user} permissions={permissions.list}>
        <Container>
          <ContainerBody className="rounded-b-xl">
            <div className="flex items-end flex-col justify-end space-y-2">
              <div className="flex justify-between flex-wrap items-start w-full">
                <Title>Pengelolaan Berita</Title>
                <Link href={`/news/add`}>
                  <a className="btn btn-primary inline-flex items-center">
                    <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" />
                    Tambah Berita
                  </a>
                </Link>
              </div>
              <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />} onChange={(e) => searchNews((e.target.value).trim())} searchInputRef={searchInputRef}/>
            </div>
            {
              isLoading && <SkeletonTable />
            }
            {
              !isLoading && 
              <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
                <thead className="bg-primary">
                  <tr>
                    <Th className="text-center">
                      No
                    </Th>
                    <Th className="text-center">
                      Judul
                    </Th>
                    <Th className="text-center">
                      Aksi
                    </Th>
                  </tr>
                </thead>
                <tbody>
                  {
                    ((news?.data)?.length === 0 && !isLoading) && (
                      <tr>
                        <Td colSpan={4} className="text-center">Berita tidak ditemukan atau Anda belum membuatnya</Td>
                      </tr>
                    )
                  }
                  {
                    (!isLoading && news?.data?.length > 0) && 
                    news?.data?.map((newsItem, newsIndex: number) => 
                      <tr key={newsIndex}>
                        <Td className="text-center">
                          { (1 + ((parseInt(news?.current_page) - 1) * parseInt(news?.per_page))) + newsIndex }
                        </Td>
                        <Td className="text-center">{newsItem.title}</Td>
                        <Td className="text-center flex justify-center space-x-2">
                          <Link href={`/news/edit/${newsItem.id}`}>
                            <a className="btn btn-primary inline-flex items-center">
                              <SolidIcon.Pencil className="-ml-1 mr-1 h-5 w-5" />
                              Ubah
                            </a>
                          </Link>
                          <Button.Danger onClick={() => deleteNews(newsItem.id)} type="button" className="inline-flex items-center">
                            <SolidIcon.Trash className="-ml-1 mr-1 h-5 w-5" /> 
                            Hapus
                          </Button.Danger>
                        </Td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            }
            {
              (!isLoading && news?.data?.length > 0) && <Pagination totalShow={news?.data?.length} currentPage={news?.current_page} total={news?.total} lastPage={news?.last_page} perPage={news?.per_page} onCurrentPageChange={onCurrentPageChange} />
            }
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default WithAuth(NewsManagement, 'crud news');