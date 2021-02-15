import React, { useState } from 'react';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { Tabs } from '@modules/Tabs';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import { User } from '@interface/User';
import Container from '@elements/container/Index';
import BodyContainer from '@elements/container/Body';

interface StudentAttendanceProps {
  user: User,
}

const StudentAttendance = ({ user }: StudentAttendanceProps) => {
  const [openTab, setOpenTab] = useState(1);

  return (
    <LayoutWithSidebar title="Kehadiran Siswa" user={user}>
      <Container className="relative">
       <BodyContainer className="rounded-b-xl">
          <h1 className="text-3xl font-bold	text-black mb-2">{`Kehadiran Siswa (${openTab === 1 ? 'Pengelolaan' : 'Laporan'})`}</h1>
          <Tabs color="primary-dark" openTab={openTab} setOpenTab={setOpenTab} />
       </BodyContainer>
      </Container>
    </LayoutWithSidebar>
  );
};

export default StudentAttendance;

export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    currentRole: user.role,
    forRoles: [3],
    context
  });
  
  return {
    props: {
      user, 
    }
  };
});