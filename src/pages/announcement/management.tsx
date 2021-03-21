import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import Title from '@elements/Title';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import * as SolidIcon from '@elements/icon/Solid';
import * as Button from '@elements/Button';
import Table from '@elements/Table';
import Th from '@elements/Th';
import Td from '@elements/Td';
import Pagination from '@modules/Pagination';
import ConfirmationModal from '@modules/ConfirmationModal';
import InputWithIcon from '@modules/InputWithIcon';
import usePermissions from '@lib/usePermissions';
import { useDispatch, useSelector } from 'react-redux';
import WithAuth from '@lib/WithAuth';
import axios from 'axios';
import Cookies from 'js-cookie';
import initialDataWithPagination from '@data/initial-data-with-pagination';
import SkeletonTable from '@modules/SkeletonTable';
import { showAlert } from '@actions/index';

const AnnouncementManagement = () => {
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [announcements, setAnnouncements] = useState(initialDataWithPagination);
  const user = useSelector(state => state.user);
  const token = Cookies.get('token');
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState(null);
  const permissions = useSelector(state => state.permissions);
  const dispatch: Function = useDispatch();
  const searchInputRef = useRef<HTMLInputElement>();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    getAnnouncements();
  }, []);

  const getAnnouncements = async (page = 1) => {
    let response;
    setLoading('get announcements');
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}announcement/management?=page${page}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
    setAnnouncements(response.data);
    setLoading(null);
  }

  const onCurrentPageChange = ({ currentPage }) => searchInputRef.current.value ? searchAnnouncement(searchInputRef.current.value, currentPage) : getAnnouncements(currentPage);

  const deleteAnnouncement = (announcementId: number) => {
    setIsConfirmationModalShow(true);
    setSelectedAnnouncementId(announcementId);
  };

  const destroyAnnouncement = async () => {
    let response;
    console.log('let\'s delete it!');
    console.log(selectedAnnouncementId);
    try {
      response = await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}announcement/${selectedAnnouncementId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      dispatch(showAlert({
        title: 'Terjadi kesalahan saat menghapus pengumuman',
        type: 'error'
      }));
      setIsConfirmationModalShow(false);
      return error;
    }
    if (!response.data.error) {
      dispatch(showAlert({
        title: response.data.message || 'Berhasil menghapus pengumuman',
        type: 'success'
      }));
      searchInputRef.current.value ? searchAnnouncement(searchInputRef.current.value) : getAnnouncements();
    }
    setIsConfirmationModalShow(false);
  };

  const searchAnnouncement = async (query: string, page: number = 1) => {
    if (!query) {
      getAnnouncements();
      return;
    };
    setLoading('get announcements');
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}announcement/search/${query}?page=${page}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
        }
      })
    } catch (error) {
      console.log(error);
      return error;
    }
    setAnnouncements(response.data);
    setLoading('');
  }

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Pengumuman" description="Apakah Anda yakin ingin menghapus pengumuman ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" onConfirm={destroyAnnouncement} />
      <LayoutWithSidebar user={user} title="Pengelolaan Pengumuman" permissions={permissions.list}>
        <Container>
          <ContainerBody className="rounded-b-xl">
            <div className="flex items-end flex-col justify-end space-y-2">
              <div className="flex justify-between flex-wrap items-start w-full">
                <Title>Pengelolaan Pengumuman</Title>
                <Link href={`/announcement/add`}>
                  <a className="btn btn-primary inline-flex items-center">
                    <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" />
                    Tambah Pengumuman
                  </a>
                </Link>
              </div>
              <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />} onChange={(e) => searchAnnouncement((e.target.value).trim(), 1)} searchInputRef={searchInputRef}/>
            </div>
            {
              loading !== 'get announcements' && (
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
                      (announcements?.data)?.length === 0 && (
                        <tr>
                          <Td colSpan={4} className="text-center">Pengumuman tidak ditemukan atau Anda belum membuat pengumuman</Td>
                        </tr>
                      )
                    }
                    {
                      (announcements?.data)?.length > 0 && (announcements?.data)?.map((announcement, announcementIndex) =>
                        <tr key={`announcement-${announcementIndex}`}>
                          <Td className="text-center">{(1 + ((announcements.current_page - 1) * announcements.per_page)) + announcementIndex}</Td>
                          <Td className="text-center">{announcement.title}</Td>
                          <Td className="text-center flex justify-center space-x-2">
                            <Link href={`/announcement/edit/${announcement.id}`}>
                              <a className="btn btn-primary inline-flex items-center">
                                <SolidIcon.Pencil className="-ml-1 mr-1 h-5 w-5" />
                                Ubah
                              </a>
                            </Link>
                            <Button.Danger onClick={() => deleteAnnouncement(announcement.id)} type="button" className="inline-flex items-center">
                              <SolidIcon.Trash className="-ml-1 mr-1 h-5 w-5" /> 
                              Hapus
                            </Button.Danger>
                          </Td>
                        </tr>
                      )
                    }
                  </tbody>
                </Table>
              )
            }
            {
              loading === 'get announcements' && <SkeletonTable />
            }
            {
              (loading !== 'get announcements' && announcements?.data?.length > 0) && <Pagination from={announcements?.from} to={announcements?.to} currentPage={announcements?.current_page} total={announcements?.total} lastPage={announcements?.last_page} perPage={announcements?.per_page} onCurrentPageChange={onCurrentPageChange} />
            }
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default WithAuth(AnnouncementManagement, 'crud announcement');
