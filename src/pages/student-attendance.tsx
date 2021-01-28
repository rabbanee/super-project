import React, { useState } from 'react';
import LayoutWithSidebar from '../components/LayoutWithSidebar';
import { Tabs } from '../components/Tabs';
import { withAuthServerSideProps } from '../lib/withAuthServerSide';
import { redirectToHome } from '../utils/redirectToHome';
import { isTeacher } from '../utils/roles/isTeacher';

const ManageAttendance = ({ user }: {user: object}) => {
  return (
    <LayoutWithSidebar title="Kehadiran Siswa" user={user}>
       <div className="bg-white p-6  rounded-xl shadow-md relative overflow-hidden container mx-auto">
        <Tabs color="primary-dark" />
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