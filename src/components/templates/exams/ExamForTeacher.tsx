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


interface ExamForTeacherProps {
  user: User,
  title: string,
}

const Editor = dynamic(
  () => import('@modules/Editor'),
  { ssr: false }
)


const ExamForTeacher = ({ user }) => {
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
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Ujian" description="Apakah Anda yakin ingin menghapus ujian ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" />
      <LayoutWithSidebar user={user} title="Ujian">
        <Container>
          <ContainerBody className="rounded-b-xl">
          <div className="flex items-end flex-col mb-2">
            <Button.Primary onClick={() => setIsModalShow(true)}>Tambahkan Ujian</Button.Primary>
          </div>
            <div className="flex justify-between space-y-3">
              <div className="flex justify-center items-center self-end space-x-1">
                <span className="text-md">Tampilkan</span>
                <ListBox items={showEntries} selectedItem={selectedShowEntry} setSelectedItem={setSelectedShowEntry} />
                <span>data</span>
              </div>
              <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />}/>
            </div>
            <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
              <thead className="bg-primary">
                <tr>
                  <Th className="text-center">
                    Judul
                  </Th>
                  <Th className="text-center">
                    Kelas
                  </Th>
                  <Th className="text-center">
                    Pelajaran
                  </Th>
                  <Th className="text-center">
                    Tanggal Mulai
                  </Th>
                  <Th className="text-center">
                    Tanggal Selesai
                  </Th>
                  <Th className="text-center">
                    Aksi
                  </Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td className="text-center">Tes Evaluasi - Mekanika</Td>
                  <Td className="text-center">XII RPL</Td>
                  <Td className="text-center">Fisika</Td>
                  <Td className="text-center">05/01/2020 07:00</Td>
                  <Td className="text-center">08/31/2023 23:00</Td>
                  <Td className="text-center flex justify-center space-x-2">
                    <Link href="/">
                      <a href="" className="btn btn-primary inline-flex items-center">
                        <SolidIcon.Eye className="-ml-1 mr-1 h-5 w-5" />
                        Lihat
                      </a>
                    </Link>
                    <Button.Danger onClick={() => setIsConfirmationModalShow(true)} type="button" className="inline-flex items-center">
                      <SolidIcon.Trash className="-ml-1 mr-1 h-5 w-5" /> 
                      Hapus
                    </Button.Danger>
                  </Td>
                </tr>
              </tbody>
              <Modal isShow={isModalShow} setIsShow={setIsModalShow}>
            <form>
              <ModalBody>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Tambahkan Ujian
                    </h3>
                    <div className="mt-4 flex flex-col space-y-3">   
                      <div>
                        <td>
                        <ListBox items={dummySubjects} label="Class" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                        </td>
                        <td>
                        <ListBox items={dummySubjects} label="Section" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                        </td> 
                        <td>
                        <ListBox items={dummySubjects} label="Subject" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                        </td>
                        
                      </div>
                      <div>
                        <label htmlFor="order_of_the_material" className="block text-sm font-medium text-gray-700">Title</label>
                        <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" />
                      </div>
                      <div>
                        <Editor/>
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <td>
                        <label htmlFor="order_of_the_material" className="block text-sm font-medium text-gray-700">Exam Start</label>
                        <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" />
                        </td>
                        <td>
                        <label htmlFor="order_of_the_material" className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" />
                        </td>
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <td>
                        <label htmlFor="order_of_the_material" className="block text-sm font-medium text-gray-700">Exam End</label>
                        <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" />
                        </td>
                        <td>
                        <label htmlFor="order_of_the_material" className="block text-sm font-medium text-gray-700">Time over</label>
                        <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" />
                        </td>
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <td>
                        <label htmlFor="order_of_the_material" className="block text-sm font-medium text-gray-700">Total Question</label>
                        <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" />
                        </td>
                        <td>
                        <label htmlFor="order_of_the_material" className="block text-sm font-medium text-gray-700">Duration(minutes)</label>
                        <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" />
                        </td>
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <td>
                        <label htmlFor="order_of_the_material" className="block text-sm font-medium text-gray-700">Minimum Test Score</label>
                        <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" />
                        </td>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                    <Button.Primary className="w-full inline-flex justify-center shadow-sm text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
                      Tambahkan Pengumuman
                    </Button.Primary>
                    <Button.Secondary type="button" className="mt-3 w-full inline-flex justify-center shadow-sm text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsModalShow(false)}>
                      Batal
                    </Button.Secondary>
                  </ModalFooter>
                </form>
              </Modal>
            </Table>
            <Pagination />
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default ExamForTeacher;