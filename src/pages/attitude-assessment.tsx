import showEntries from '@data/show-entries';
import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import Table from '@elements/Table';
import Td from '@elements/Td';
import Th from '@elements/Th';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import ListBox from '@modules/ListBox';
import Pagination from '@modules/Pagination';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import dummySubjects from '@data/dummies/subjects';
import { User } from '@interface/User';
import { useState } from 'react';
import InputWithIcon from '@modules/InputWithIcon';
import * as SolidIcon from '@elements/icon/Solid';
import grades from '@data/grades';
import attitudes from '@data/attitudes';
import * as OutlineIcon from '@elements/icon/Outline';
import Title from '@elements/Title';

interface AttitudeAssessmentProps {
  user: User,
  permissions: any,
}

const AttitudeAssessment = ({ user, permissions }: AttitudeAssessmentProps) => {
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedSubject, setSelectedSubject] = useState(attitudes[0]);

  return (
    <>
      <LayoutWithSidebar user={user} title="Penilaian Sikap" permissions={permissions}>
        <Container>
          <ContainerBody className="rounded-b-xl">
            <div className="flex justify-between mb-2">
              <Title>Penilaian Sikap</Title>
            </div>
            <div className="flex justify-between space-y-3 items-end">
              <div className="flex justify-center items-center self-end space-x-1">
                 <ListBox items={grades} selectedItem={selectedGrade} setSelectedItem={setSelectedGrade} label="Kelas" />
              </div>
              <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />}/>
            </div>
            <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
              <thead className="bg-primary">
                <tr>
                  <Th>
                    No
                  </Th>
                  <Th>
                    Nama
                  </Th>
                  <Th>
                    Perilaku
                  </Th>
                  <Th>
                    Kerapian
                  </Th>
                  <Th>
                    Kedisiplinan
                  </Th>
                  <Th>
                    Kerja sama
                  </Th>
                  <Th>
                    Kreatif
                  </Th>
                  <Th>
                    Keterangan
                  </Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td className="text-center">1</Td>
                  <Td>Manusia</Td>
                  <td className="px-2">
                   <select name="" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      {
                        attitudes.map((attitude, attitudeIndex) => 
                          <option key={attitudeIndex}>{attitude}</option>
                        )
                      }
                   </select>
                  </td>
                  <td className="px-2">
                   <select name="" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      {
                        attitudes.map((attitude, attitudeIndex) => 
                          <option key={attitudeIndex}>{attitude}</option>
                        )
                      }
                   </select>
                  </td>
                  <td className="px-2">
                   <select name="" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      {
                        attitudes.map((attitude, attitudeIndex) => 
                          <option key={attitudeIndex}>{attitude}</option>
                        )
                      }
                   </select>
                  </td>
                  <td className="px-2">
                   <select name="" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      {
                        attitudes.map((attitude, attitudeIndex) => 
                          <option key={attitudeIndex}>{attitude}</option>
                        )
                      }
                   </select>
                  </td>
                  <td className="px-2">
                   <select name="" id="" className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm">
                      {
                        attitudes.map((attitude, attitudeIndex) => 
                          <option key={attitudeIndex}>{attitude}</option>
                        )
                      }
                   </select>
                  </td>
                  <td className="px-2">
                    <input id="information" name="information" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Keterangan" />
                  </td>
                </tr>
              </tbody>
            </Table>
            <Pagination />
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default AttitudeAssessment;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
    return {
      props: {
        user, 
        permissions,
      }
    };
  });
