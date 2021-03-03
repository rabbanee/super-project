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
import { DatePicker } from '@modules/Datepicker';
import dynamic from 'next/dynamic'
import ContainerFooter from '@elements/container/Footer';
import * as OutlineIcon from '@elements/icon/Outline';
import checkPermissions from '@utils/checkPermissions';


interface TestScoresProps {
  user: User,
  title: string,
  permissions: any,
}

const TestScores= ({ user, permissions }) => {
  const [selectedShowEntry, setSelectedShowEntry] = useState(showEntries[0]);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(() => dummySubjects[0]);
  const [selectedChapter, setSelectedChapter] = useState(() => dummyChapters[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const chapterNameRef = useRef();
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <LayoutWithSidebar user={user} title="Nilai Ujian" permissions={permissions}>
        <Container>
          <ContainerBody className="rounded-b-xl">
          <div className="flex justify-between items-baseline">
              <h2 className="text-3xl font-bold	text-black mb-2">Nilai Ujian</h2>
              <Button.Primary type="button" onClick={() => setIsModalShow(true)} className="inline-flex items-center">
                <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" />
                Tambah Nilai
              </Button.Primary>
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
                    Nama Pelajaran
                  </Th>
                  <Th className="text-center">
                    Jenis Ujian
                  </Th>
                  <Th className="text-center">
                    Pengajar
                  </Th>
                  <Th className="text-center">
                    Create at
                  </Th>
                  <Th className="text-center">
                    Action
                  </Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td className="text-center">1</Td>
                  <Td className="text-center">Fisika</Td>
                  <Td className="text-center">UTS</Td>
                  <Td className="text-center">Pak Deddy</Td>
                  <Td className="text-center">05/01/2020 07:00</Td>
                  <Td className="text-center flex justify-center space-x-2">
                        <Link href={`/`} passHref>
                          <a className="btn btn-primary inline-flex items-center">
                            <SolidIcon.DocumentSearch className="-ml-1 mr-1 h-5 w-5" />
                          Periksa
                          </a>
                        </Link>
                        <Button.Danger onClick={() => setIsConfirmationModalShow(true)} type="button" className="inline-flex items-center">
                          <SolidIcon.Pencil className="-ml-1 mr-1 h-5 w-5" /> 
                          Update
                        </Button.Danger>
                  </Td>
                </tr>
                <tr>
                  <Td className="text-center">2</Td>
                  <Td className="text-center">Fisika</Td>
                  <Td className="text-center">UTS</Td>
                  <Td className="text-center">Pak Deddy</Td>
                  <Td className="text-center">05/01/2020 07:00</Td>
                  <Td className="text-center flex justify-center space-x-2">
                        <Link href={`/`} passHref>
                          <a className="btn btn-primary inline-flex items-center">
                            <SolidIcon.DocumentSearch className="-ml-1 mr-1 h-5 w-5" />
                          Periksa
                          </a>
                        </Link>
                        <Button.Danger onClick={() => setIsConfirmationModalShow(true)} type="button" className="inline-flex items-center">
                          <SolidIcon.Pencil className="-ml-1 mr-1 h-5 w-5" /> 
                          Update
                        </Button.Danger>
                  </Td>
                </tr>
                <tr>
                  <Td className="text-center">3</Td>
                  <Td className="text-center">Fisika</Td>
                  <Td className="text-center">UTS</Td>
                  <Td className="text-center">Pak Deddy</Td>
                  <Td className="text-center">05/01/2020 07:00</Td>
                  <Td className="text-center flex justify-center space-x-2">
                    <Link href={`/`} passHref>
                      <a className="btn btn-primary inline-flex items-center">
                        <SolidIcon.DocumentSearch className="-ml-1 mr-1 h-5 w-5" />
                      Periksa
                      </a>
                    </Link>
                    <Button.Danger onClick={() => setIsConfirmationModalShow(true)} type="button" className="inline-flex items-center">
                      <SolidIcon.Pencil className="-ml-1 mr-1 h-5 w-5" /> 
                      Update
                    </Button.Danger>
                  </Td>
                </tr>
              </tbody>
            </Table>
            <Pagination />
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
      <Modal isShow={isModalShow} setIsShow={setIsModalShow}>
        <form>
          <ModalBody>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Tambahkan Nilai
                </h3>
                <div className="grid grid-cols-3 gap-3 w-full">
                <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Nama Pelajaran</label>
                    <input id="duration" name="duration" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Nama Pelajaran" />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="minimum-score" className="block text-sm font-medium text-gray-700">Jenis Ujian</label>
                    <input id="minimum-score" name="minimum-score" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Jenis Ujian" />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Pengajar</label>
                    <input id="duration" name="duration" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Nama Pengajar" />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="start-date" className="block text-sm leading-5 font-medium text-gray-700">Tanggal Dibuat</label>
                    <DatePicker
                      id="start-date"
                      onChange={setStartDate}
                      date={startDate}
                    />
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button.Primary className="w-full inline-flex justify-center shadow-sm text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
              Tambahkan Ujian
            </Button.Primary>
            <Button.Secondary type="button" className="mt-3 w-full inline-flex justify-center shadow-sm text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsModalShow(false)}>
              Batal
            </Button.Secondary>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
};

export default TestScores;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User, permissions: any)  {
  checkPermissions({
    context,
    permissions,
    permissionName: 'crud score',
  });
  return {
    props: {
      user, 
      permissions,
    }
  };
});
