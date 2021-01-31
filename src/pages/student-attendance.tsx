import React, { useState } from 'react';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { Tabs } from '@modules/Tabs';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { redirectToHome } from '@utils/redirectToHome';
import { isTeacher } from '@utils/roles/isTeacher';

const ManageAttendance = ({ user }: {user: object}) => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <LayoutWithSidebar title="Kehadiran Siswa" user={user}>
       <div className="bg-white p-6  rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <h1 className="text-3xl font-bold	text-black mb-2">{`Kehadiran Siswa (${openTab === 1 ? 'Pengelolaan' : 'Laporan'})`}</h1>
        <Tabs color="primary-dark" openTab={openTab} setOpenTab={setOpenTab} />
       
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