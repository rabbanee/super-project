import React, { useState } from 'react';
import WithAuth from '@lib/WithAuth';
import { User } from '@interface/User';
import Error from 'next/error';
import StudentAttendanceJustReport from '@templates/student-attendance/StudentAttendanceJustReport';
import StudentAttendanceCRUDAndReport from '@templates/student-attendance/StudentAttendanceCRUDAndReport';
import findPermissionByName from '@utils/findPermissionByName';
import { useDispatch, useSelector } from 'react-redux';

interface StudentAttendanceProps {
  user: User,
  permissions: any,
}

const StudentAttendance = () => {
  const user = useSelector(state => state.user);
  const permissions = useSelector(state => state.permissions);
  if (findPermissionByName(permissions.list, 'crud student attandance')) {
    return (
      <StudentAttendanceCRUDAndReport user={user} permissions={permissions.list}/>
    );
  } else if (findPermissionByName(permissions.list, 'recap student attandance')) {
    return (
      <StudentAttendanceJustReport user={user} permissions={permissions.list}/>
    )
  } else {
    return <Error statusCode={403} />
  }
};

export default WithAuth(StudentAttendance);

// export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
//   return {
//     props: {
//       user, 
//       permissions,
//     }
//   };
// });