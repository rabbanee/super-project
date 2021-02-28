import React, { useState } from 'react';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { User } from '@interface/User';
import Error from 'next/error';
import StudentAttendanceJustReport from '@templates/student-attendance/StudentAttendanceJustReport';
import StudentAttendanceCRUDAndReport from '@templates/student-attendance/StudentAttendanceCRUDAndReport';
import findPermissionByName from '@utils/findPermissionByName';

interface StudentAttendanceProps {
  user: User,
  permissions: any,
}

const StudentAttendance = ({ user, permissions }: StudentAttendanceProps) => {
  if (findPermissionByName(permissions, 'crud student attandance')) {
    return (
      <StudentAttendanceCRUDAndReport user={user} permissions={permissions}/>
    );
  } else if (findPermissionByName(permissions, 'recap student attandance')) {
    return (
      <StudentAttendanceJustReport user={user} permissions={permissions}/>
    )
  } else {
    return <Error statusCode={404} />
  }
};

export default StudentAttendance;

export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
  return {
    props: {
      user, 
      permissions,
    }
  };
});