import { useEffect, useState } from 'react';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import Title from '@elements/Title';
import Link from 'next/link';
import * as SolidIcon from '@elements/icon/Solid';
import findPermissionByName from '@utils/findPermissionByName';
import usePermissions from '@lib/usePermissions';
import { useSelector } from 'react-redux';
import WithAuth from '@lib/WithAuth';
import axios from 'axios';
import Cookies from 'js-cookie';
import initialDataWithPagination from '@data/initial-data-with-pagination';
import SkeletonAnnouncementTable from "@modules/SkeletonAnnouncementTable";
import convertDate from '@utils/convertDate';

function Announcement() {
  const user = useSelector(state => state.user);
  const [announcements, setAnnouncements] = useState(initialDataWithPagination);
  const [isLoading, setIsLoading] = useState(false);
  const permissions = useSelector(state => state.permissions);
  const token = Cookies.get('token');

  useEffect(() => {
    getAnnouncement();
  }, []);

  const getAnnouncement = async () => {
    let response: any;
    setIsLoading(true);
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}announcement`, {
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
    <LayoutWithSidebar title="Pengumuman" user={user} permissions={permissions.list}>
      <div className="flex justify-between items-start">
        <Title className="mb-2">Pengumuman</Title>
        { findPermissionByName(permissions.list, 'crud announcement')  &&
          <Link href={`/announcement/management`}>
            <a className="btn btn-primary inline-flex items-center">
              <SolidIcon.Adjustments className="-ml-1 mr-1 h-5 w-5" />
              Pengelolaan Pengumuman
            </a>
          </Link>
        }
      </div>
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
                  <th className="w-1/4">Tanggal</th>
                  <th className="w-1/4">:</th>
                  <td>{convertDate(announcement.created_at)}</td>
                </tr>
                <tr>
                  <th className="w-1/4">Pembuat pengumuman</th>
                  <th className="w-1/4">:</th>
                  <td>{announcement.user.name}</td>
                </tr>
              </tbody>
            </table>
            <hr className="mt-2"/>
            <div dangerouslySetInnerHTML={createMarkup(announcement.description)} className='ck-content mt-2'></div>
          </div>
        )
      }
      {
        (!isLoading && announcements?.data?.length === 0) && 
        <div className="bg-white p-6 md:px-10 rounded-xl shadow-md relative overflow-hidden container mx-auto mb-2">
          Pengumuman tidak ditemukan!  
        </div>
      }
    </LayoutWithSidebar>
  );
}

export default WithAuth(Announcement, 'view announcement');