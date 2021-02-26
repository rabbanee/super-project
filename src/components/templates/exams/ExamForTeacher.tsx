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
import majors from '@data/majors';
import { DatePicker } from '@modules/Datepicker';
import TimeInput from '@modules/TimeInput';
import Title from '@elements/Title';


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
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);
  const [selectedMajors, setSelectedMajors] = useState(majors[0]);
  const [isModalShow, setIsModalShow] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Ujian" description="Apakah Anda yakin ingin menghapus ujian ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" />
      <LayoutWithSidebar user={user} title="Ujian">
        <Container>
          <ContainerBody className="rounded-b-xl">
            <Title>Ujian</Title>
            <div className="flex justify-between space-y-3 flex-wrap items-baseline">
              <Button.Primary onClick={() => setIsModalShow(true)}>Tambah Ujian</Button.Primary>
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
                    <Link href="/exams/room/1">
                      <a className="btn btn-primary inline-flex items-center">
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
      <Modal isShow={isModalShow} setIsShow={setIsModalShow}>
        <form>
          <ModalBody>
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Tambahkan Ujian
                </h3>
                <div className="grid grid-cols-3 gap-3 w-full">   
                  <div className="col-span-3 sm:col-span-1">
                    <ListBox items={grades} label="Kelas" selectedItem={selectedGrade} setSelectedItem={setSelectedGrade}/>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <ListBox items={majors} label="Jurusan" selectedItem={selectedMajors} setSelectedItem={setSelectedMajors}/>
                  </div>
                  <div className="col-span-3 sm:col-span-1">
                    <ListBox items={dummySubjects} label="Pelajaran" selectedItem={selectedSubject} setSelectedItem={setSelectedSubject}/>
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Ujian</label>
                    <input id="title" name="title" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Judul Ujian" />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="exam_description" className="block text-sm font-medium text-gray-700">Deskripsi Ujian</label>
                    <input id="exam_description" name="exam_description" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Deskripsi Ujian" />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="start-date" className="block text-sm leading-5 font-medium text-gray-700">Tanggal Mulai</label>
                    <DatePicker
                      id="start-date"
                      onChange={setStartDate}
                      date={startDate}
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="time-input" className="block text-sm leading-5 font-medium text-gray-700">Waktu Mulai</label>
                    <div className="flex shadow-md">
                      <TimeInput id="time-input" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm flex-grow border-r-0"  />
                      <button
                        className="bg-gray-300 rounded-r-md flex items-center justify-center text-sm font-semibold px-2 focus:outline-none"
                        type="button"
                      >
                        <OutlineIcon.Clock className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="end-date" className="block text-sm leading-5 font-medium text-gray-700">Tanggal Selesai</label>
                    <DatePicker
                      onChange={setEndDate}
                      date={endDate}
                      id="end-date"
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="time-input" className="block text-sm leading-5 font-medium text-gray-700">Waktu Selesai</label>
                    <div className="flex shadow-md">
                      <TimeInput id="time-input" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm flex-grow border-r-0"  />
                      <button
                        className="bg-gray-300 rounded-r-md flex items-center justify-center text-sm font-semibold px-2 focus:outline-none"
                        type="button"
                      >
                        <OutlineIcon.Clock className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Durasi (Dalam menit)</label>
                    <input id="duration" name="duration" type="number" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Durasi Ujian" />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <label htmlFor="minimum-score" className="block text-sm font-medium text-gray-700">KKM</label>
                    <input id="minimum-score" name="minimum-score" type="number" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="KKM" />
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

export default ExamForTeacher;