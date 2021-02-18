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

interface StudentAttendanceProps {
  user: User,
}

const StudentAttendance = ({ user }: StudentAttendanceProps) => {
  const [openedTab, setOpenedTab] = useState(1);
  const [date, setDate] = useState(new Date());
  const [selectedShowEntry, setSelectedShowEntry] = useState(showEntries[0]);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);


  return (
    <>
    <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Ujian" description="Apakah Anda yakin ingin menghapus ujian ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" /> 
    <LayoutWithSidebar title="Kehadiran Siswa" user={user}>
      <Container className="relative">
       <ContainerBody className="rounded-b-xl">
          <h1 className="text-3xl font-bold	text-black mb-2">{`Kehadiran Siswa (${openedTab === 1 ? 'Pengelolaan' : 'Laporan'})`}</h1>
          <Tab color="primary-dark" openTab={openedTab} setOpenTab={setOpenedTab}>
            <TabList>
              <TabItem openedTab={openedTab} thisTab={1} setOpenedTab={setOpenedTab} color="primary-dark" href="#management">
                Pengelolaan
              </TabItem>
              <TabItem openedTab={openedTab} thisTab={2} setOpenedTab={setOpenedTab} color="primary-dark" href="#report">
                Laporan
              </TabItem>
            </TabList>
            <TabContentContainer>
              <TabContent openedTab={openedTab} thisTab={1}>
                <div className={`flex md:space-x-6 md:items-end flex-col items-start space-y-4 md:flex-row`} id="link1">
                  <ListBox items={grades} label="Kelas" />
                  <div>
                    <label htmlFor="date-picker" className="block text-sm leading-5 font-medium text-gray-700">Tanggal</label>
                    <DatePicker
                      onChange={setDate}
                      date={date}
                    />
                  </div>
                  <div>
                    <Button.Primary type="button">Lihat</Button.Primary>
                  </div>
                </div>
                <Table color="gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <Th className="text-gray-500 text-xs uppercase">
                        Siswa
                      </Th>
                      <Th className="text-gray-500 text-xs uppercase">
                        Status
                      </Th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dummyStudents.map((dummyUser, dummyUserIndex) => 
                      <tr key={dummyUserIndex} className="even:bg-gray-50">
                        <Td className="text-xs uppercase">
                          <span>{ dummyUser }</span>
                        </Td>
                        <Td className="flex space-x-1 text-xs uppercase">
                          {
                            attendanceStatuses.map((attendanceStatus, attendanceStatusIndex) => 
                              <div key={attendanceStatusIndex}>
                                <input className="hidden" type="radio" name={`user-${dummyUserIndex}`} value={`${attendanceStatusIndex + 1}`} id={`${attendanceStatusIndex + 1}-user-${dummyUserIndex}`} defaultChecked={attendanceStatus.name === 'Hadir'}/>
                                <label htmlFor={`${attendanceStatusIndex + 1}-user-${dummyUserIndex}`} className={`border label-checked:bg-${attendanceStatus.color} px-2 py-2 border-${attendanceStatus.color} label-checked:text-white rounded cursor-pointer`}>
                                  { attendanceStatus.name  }
                                </label>
                              </div>
                            )
                          }
                        </Td>
                      </tr>
                      )
                    }
                  </tbody>
                </Table>
              </TabContent>
              <TabContent openedTab={openedTab} thisTab={2}>
                <div className={`flex md:space-x-6 md:items-end flex-col items-start space-y-3 md:flex-row`} id="link1">
                  <ListBox items={grades} label="Kelas"/>
                  <ListBox items={monthNames} label="Bulan" className="w-40"/>
                  <ListBox items={rangeOfYears(2020)} label="Tahun" className="w-40"/>
                  <div>
                    <Button.Primary type="button">
                      Lihat
                    </Button.Primary>
                  </div>
                  <div>
                  <Button.Danger onClick={() => setIsConfirmationModalShow(true)} type="button" className="inline-flex items-center">
                      <SolidIcon.Trash className="-ml-1 mr-1 h-5 w-5" /> 
                      Hapus
                    </Button.Danger>
                  </div>
                </div>
                <h2 className="text-2xl font-bold my-3">Februari 2020</h2>
                <ul className="flex md:space-x-2 mb-3 flex-wrap">
                  {
                    attendanceStatuses.map((attendanceStatus, i) => 
                      <li className="flex items-center space-x-1 md:mr-0 mr-1" key={i}>
                        <StatusPill className={`bg-${ attendanceStatus.color }`}/>
                        <span>{ attendanceStatus.name }</span>
                      </li>
                    )
                  }
                </ul>
                <Table color="gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <Th className="text-gray-500 text-xs uppercase">
                        Siswa
                      </Th>
                      {
                        Array.apply(1, Array(30)).map((e, i) => 
                          <Th className="text-gray-500 text-xs uppercase" key={i}>
                            {i+1}
                          </Th>
                        )
                      }
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      dummyStudents.map((dummyUser, dummyUserIndex) => 
                      <tr key={dummyUserIndex}>
                        <Td className="text-xs uppercase">
                          <span>{ dummyUser }</span>
                        </Td>
                        {
                          Array.apply(1, Array(30)).map((e, i) => 
                            <Td className="text-xs uppercase" key={i}>
                              <StatusPill className={`bg-green-500`}/>
                            </Td>
                          )
                        }
                      </tr>
                      )
                    }
                  </tbody>
                </Table>
              </TabContent>
            </TabContentContainer>
          </Tab>
       </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  </>
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