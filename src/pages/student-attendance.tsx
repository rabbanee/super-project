import React, { useState } from 'react';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import { thisPageFor } from '@utils/thisPageFor';
import { User } from '@interface/User';
import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import Tab from '@elements/Tab';
import TabList from '@elements/TabList';
import TabItem from '@elements/TabItem';
import TabContentContainer from '@elements/TabContentContainer';
import TabContent from '@elements/TabContent';
import ListBox from '@modules/ListBox';
import grades from '@data/grades';
import { DatePicker } from '@modules/Datepicker';
import Table from '@elements/Table';
import Th from '@elements/Th';
import dummyStudents from '@data/dummies/students';
import Td from '@elements/Td';
import attendanceStatuses from '@data/attendance-statuses';
import * as Button from '@elements/Button';
import { monthNames } from '@data/months';
import { rangeOfYears } from '@utils/rangeOfYears';
import StatusPill from '@elements/StatusPill';
import * as SolidIcon from '@elements/icon/Solid';
import Link from 'next/link';
import ConfirmationModal from '@modules/ConfirmationModal';
import showEntries from '@data/show-entries';
import { isTeacher } from '@utils/roles/isTeacher';
import StudentAttendanceForTeacher from '@templates/student-attendance/StudentAttendanceForTeacher';
import { isStudent } from '@utils/roles/isStudent';
import { isGuardianOfStudent } from '@utils/roles/isGuardianOfStudent';
import Error from 'next/error';
import StudentAttendanceForStudentOrGuardianOfStudent from '@templates/student-attendance/StudentAttendanceForStudentOrGuardianOfStudent';

interface StudentAttendanceProps {
  user: User,
}

const StudentAttendance = ({ user }: StudentAttendanceProps) => {
  if (isTeacher(user.role)) {
    return (
      <StudentAttendanceForTeacher user={user} />
    );
  } else if (isStudent(user.role) || isGuardianOfStudent(user.role)) {
    return (
      <StudentAttendanceForStudentOrGuardianOfStudent  user={user}/>
    )
  } else {
    <Error statusCode={404} />
  }
};

export default StudentAttendance;

export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  thisPageFor({
    currentRole: user.role,
    forRoles: [3,4,5],
    context
  });
  
  return {
    props: {
      user, 
    }
  };
});