import showEntries from '@data/show-entries';
import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import Table from '@elements/Table';
import Td from '@elements/Td';
import Th from '@elements/Th';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import InputWithIcon from '@modules/InputWithIcon';
import ListBox from '@modules/ListBox';
import Pagination from '@modules/Pagination';
import * as SolidIcon from '@elements/icon/Solid';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import * as Button from '@elements/Button';
import Link from 'next/link';
import ConfirmationModal from '@modules/ConfirmationModal';
import dummySubjects from '@data/dummies/subjects';
import dummyChapters from '@data/dummies/chapters';
import { User } from '@interface/User';
import { useRef, useState } from 'react';
import Modal from '@elements/Modal';
import ModalBody from '@elements/ModalBody';
import ModalFooter from '@elements/ModalFooter';
import grades from '@data/grades';
import dynamic from 'next/dynamic'
import ContainerFooter from '@elements/container/Footer';
import * as OutlineIcon from '@elements/icon/Outline';


interface AttitudeAssessmentProps {
  user: User,
}

const AttitudeAssessment = ({ user }: AttitudeAssessmentProps) => {
  const [selectedShowEntry, setSelectedShowEntry] = useState(showEntries[0]);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(() => dummySubjects[0]);
  const [selectedChapter, setSelectedChapter] = useState(() => dummyChapters[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const chapterNameRef = useRef();
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);

  return (
    <>
      <LayoutWithSidebar user={user} title="Penilaian Sikap">
        <Container>
          <ContainerBody className="rounded-b-xl">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold	text-black mb-2">Penilaian Sikap</h2>
          </div>
            <div className="flex justify-between space-y-3">
              <div className="flex justify-center items-center self-end space-x-1">
                <span className="text-md">Kelas</span>
               <tr>
                <td>   
                 <ListBox items={showEntries} selectedItem={selectedShowEntry} setSelectedItem={setSelectedShowEntry} />
                </td>
               </tr>
               <span className="text-md">Jurusan</span>
               <tr>
                <td>   
                 <ListBox items={showEntries} selectedItem={selectedShowEntry} setSelectedItem={setSelectedShowEntry} />
                </td>
               </tr>
              </div>
            
              {/* <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />}/> */}
            </div>
            <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
              <thead className="bg-primary">
                <tr>
                  <Th className="text-center">
                    No
                  </Th>
                  <Th className="text-center">
                    Nama
                  </Th>
                  <Th className="text-center">
                    Prilaku
                  </Th>
                  <Th className="text-center">
                    Kerapihan
                  </Th>
                  <Th className="text-center">
                    Kedisiplinan
                  </Th>
                  <Th className="text-center">
                    KerjaSama
                  </Th>
                  <Th className="text-center">
                    Kreatif
                  </Th>
                  <Th className="text-center">
                    Keterangan
                  </Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td className="text-center">1</Td>
                  <Td className="text-center">Kang cut</Td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td> 
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td> 
                  <td>
                    <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Keterangan" />
                  </td>
                </tr>
                <tr>
                  <Td className="text-center">2</Td>
                  <Td className="text-center">Kang pung</Td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td> 
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td> 
                  <td>
                   <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Keterangan" />
                  </td>
                </tr>
                <tr>
                  <Td className="text-center">3</Td>
                  <Td className="text-center">Kang Bungkus</Td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td> 
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td> 
                  <td>
                   <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Keterangan" />
                  </td>
                </tr>
                <tr>
                  <Td className="text-center">4</Td>
                  <Td className="text-center">Kang bikin Peraturan</Td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td> 
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <ListBox items={dummySubjects} selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </td>
                  <td>
                   <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Keterangan"/>
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
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
    return {
      props: {
        user, 
      }
    };
  });
