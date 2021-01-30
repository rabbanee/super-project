import React, { useState } from 'react';
import LayoutWithSidebar from '../components/layouts/LayoutWithSidebar';
import { Tabs } from '../components/modules/Tabs';
import { withAuthServerSideProps } from '../lib/withAuthServerSide';
import { redirectToHome } from '../utils/redirectToHome';
import { isTeacher } from '../utils/roles/isTeacher';

const ManageAttendance = ({ user }: {user: object}) => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <LayoutWithSidebar title="Kehadiran Siswa" user={user}>
       <div className="bg-white p-6  rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <h1 className="text-3xl font-bold	text-black mb-2">{`Kehadiran Siswa (${openTab === 1 ? 'Pengelolaan' : 'Laporan'})`}</h1>
        <Tabs color="primary-dark" openTab={openTab} setOpenTab={setOpenTab} />
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
       </div>
      
      
    </LayoutWithSidebar>
  );
};

export default ManageAttendance;

export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: any)  {
  if (!isTeacher(user.role)) redirectToHome(context);
  
  return {
    props: {
      user, 
    }
  };
});