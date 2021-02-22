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
import ContainerFooter from '@elements/container/Footer';
import * as OutlineIcon from '@elements/icon/Outline';


interface ExamForTeacherProps {
  user: User,
  title: string,
}


const ExamForTeacher = ({ user }) => {
  const [selectedShowEntry, setSelectedShowEntry] = useState(showEntries[0]);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(() => dummySubjects[0]);
  const [selectedChapter, setSelectedChapter] = useState(() => dummyChapters[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShow, setIsModalShow] = useState(false);
  const chapterNameRef = useRef();

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Ujian" description="Apakah Anda yakin ingin menghapus ujian ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" />
      <LayoutWithSidebar user={user} title="Ujian">
        <Container>
          <ContainerBody className="rounded-b-xl">
          <form>
            <Container>
              <ContainerBody className="px-4 py-5 bg-white sm:p-6 rounded-t-xl">
                <div className="flex justify-between mb-2">
                  <h2 className="text-4xl font-bold	text-black mb-2"></h2>
                  <Button.Primary type="button" onClick={() => setIsModalShow(true)} className="inline-flex items-center">
                    <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" />
                    Tambah Ujian
                  </Button.Primary>
                </div>
                <div className="grid grid-cols-6 gap-4 mt-2">
                  <div className="col-span-6 sm:col-span-6">
                    <label htmlFor="order_of_the_material" className="block text-sm font-medium text-gray-700">Urutan Materi</label>
                    <input id="order_of_the_material" name="order_of_the_material" type="text" autoComplete="order_of_the_material" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Urutan Materi"/>
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <ListBox items={dummySubjects} label="Mata Pelajaran" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <ListBox items={dummyChapters} label="Bab" selectedItem={selectedChapter} setSelectedItem={setSelectedChapter}/>
                  </div>
                </div>
              </ContainerBody>
              <ContainerFooter className="flex justify-end">
                <Button.Primary  
                  className={`${isLoading && 'cursor-not-allowed'} inline-flex items-center`}
                  disabled={isLoading}
                >
                    {
                      isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" /> 
                    }
                    {
                      isLoading ? 'Memproses' : <><SolidIcon.Save className="-ml-1 mr-1 h-5 w-5" /> Simpan</>
                    }
                </Button.Primary>
              </ContainerFooter>
            </Container>
           </form>
           <Modal isShow={isModalShow} setIsShow={setIsModalShow}>
            <form>
              <ModalBody>
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Tambahkan Bab
                    </h3>
                    <div className="mt-4 flex flex-col space-y-3">   
                      <div>
                        <ListBox items={dummySubjects} label="Mata Pelajaran" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                      </div>
                      <div>
                        <label htmlFor="chapter" className="block text-sm font-medium text-gray-700">Nama Bab</label>
                        <input id="chapter" name="chapter" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" ref={chapterNameRef} placeholder="Nama Bab" />
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button.Primary className="w-full inline-flex justify-center shadow-sm text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
                  Tambahkan Bab
                </Button.Primary>
                <Button.Secondary type="button" className="mt-3 w-full inline-flex justify-center shadow-sm text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setIsModalShow(false)}>
                  Batal
                </Button.Secondary>
              </ModalFooter>
            </form>
          </Modal>
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
            </Table>
            <Pagination />
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default ExamForTeacher;