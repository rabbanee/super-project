import ContainerBody from "@elements/container/Body";
import Container from "@elements/container/Index";
import Tab from "@elements/Tab";
import TabContent from "@elements/TabContent";
import TabContentContainer from "@elements/TabContentContainer";
import TabItem from "@elements/TabItem";
import TabList from "@elements/TabList";
import { User } from "@interface/User";
import LayoutWithSidebar from "@layouts/LayoutWithSidebar";
import ExamInformation from "@elements/exam/ExamInformation";
import { useEffect, useRef, useState } from "react";
import * as Button from '@elements/Button';
import ListBox from "@modules/ListBox";
import showEntries from "@data/show-entries";
import InputWithIcon from "@modules/InputWithIcon";
import * as SolidIcon from '@elements/icon/Solid';
import Table from "@elements/Table";
import Th from "@elements/Th";
import Td from "@elements/Td";
import Link from "next/link";
import Pagination from "@modules/Pagination";
import { DatePicker } from '@modules/Datepicker';
import TimeInput from "@modules/TimeInput";
import * as OutlineIcon from '@elements/icon/Outline';
import ConfirmationModal from "@modules/ConfirmationModal";
import Modal from "@elements/Modal";
import ModalBody from "@elements/ModalBody";
import Title from "@elements/Title";
import dummyQuizzes from "@data/dummies/quizzes";


interface ExamRoomForTeacherProps {
  user: User,
}

const tabs = [
  'Detail Ujian',
  'Soal',
  'Hasil',
  'Ubah Ujian',
];

const ExamRoomForTeacher = ({ user }: ExamRoomForTeacherProps) => {
  const [openedTab, setOpenedTab] = useState(1);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const timeInputRef: any = useRef(null);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [isImportQuestionModalShow, setIsImportQuestionModalShow] = useState(false);
  const [quizzes, setQuizzes] = useState(dummyQuizzes);

  const onButtonClick = () => {
    // `current` points to the mounted text input element
    console.log(timeInputRef);
    
    // timeInputRef.current.focus();
  };  

  useEffect(() => {
    console.log(quizzes);
  }, [quizzes]);

  const handleAllChecked = (event) => {
    const newQuizzes = quizzes;
    newQuizzes.forEach(quiz =>  quiz.isChecked = event.target.checked);
    console.log('handleAllChecked: ', newQuizzes);
    
    setQuizzes([...newQuizzes]);
  }

  
  const handleCheckChieldElement = (event) => {
    const newQuizzes = quizzes;
    newQuizzes.forEach(quiz => {
      if (quiz.id == event.target.id) quiz.isChecked =  event.target.checked;
    });
    setQuizzes([...newQuizzes])
  }

  return (
    <>
      {/* Import Question Modal  */}
      <Modal isShow={isImportQuestionModalShow} setIsShow={setIsImportQuestionModalShow}>
        <ModalBody className="overflow-hidden">
         <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl w-full">
            <thead className="bg-primary">
              <tr>
                <Th className="text-center">
                  <input id="select" name="select" type="checkbox" className="h-4 w-4 text-primary-darkest focus:ring-primary-dark border-gray-300 rounded focus:outline-none" onClick={handleAllChecked}/>
                </Th>
                <Th className="text-center">
                  No
                </Th>
                <Th className="text-center">
                  Soal
                </Th>
                <Th className="text-center">
                  Jawaban
                </Th>
                <Th className="text-center">
                  Pelajaran
                </Th>
                <Th className="text-center">
                  Kelas
                </Th>
                <Th className="text-center">
                  Aksi
                </Th>
              </tr>
            </thead>
            <tbody>
              {
                dummyQuizzes.map((dummyQuiz, dummyQuizIndex) => 
                  <tr key={dummyQuizIndex}>
                    <Td className="text-center"> 
                      <input id={`${dummyQuiz.id}`} name="select" type="checkbox" className="h-4 w-4 text-primary-darkest focus:ring-primary-dark border-gray-300 rounded focus:outline-none" onChange={handleCheckChieldElement} checked={dummyQuiz.isChecked}/>
                    </Td>
                    <Td className="text-center">{dummyQuizIndex+1}</Td>
                    <Td className="text-center">{dummyQuiz.question}</Td>
                    <Td className="text-center truncate">{dummyQuiz.trueAnswer}</Td>
                    <Td className="text-center">
                      {dummyQuiz.subject}
                    </Td>
                    <Td className="text-center">
                      {dummyQuiz.grade}
                    </Td>
                    <Td className="text-center">
                      <Button.Primary>
                        Impor
                      </Button.Primary>
                    </Td>
                  </tr>
                )
              }
            </tbody>
          </Table>
          <Pagination />
        </ModalBody>
      </Modal>
      {/* Confirmation Modal for Question  */}
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Soal" description="Apakah Anda yakin ingin menghapus soal ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" />
      <LayoutWithSidebar title={`Ruang Ujian (${tabs[openedTab-1]})`} user={user}>
        <Container>
          <ContainerBody className="rounded-b-xl">
            <Title className="mb-1">{`Ruang Ujian (${tabs[openedTab-1]})`}</Title>
            <Tab color="primary-dark" openTab={openedTab} setOpenTab={setOpenedTab}>
              <TabList>
                {
                  tabs.map((tab, tabIndex) => 
                    <TabItem key={tabIndex} openedTab={openedTab} thisTab={tabIndex+1} setOpenedTab={setOpenedTab} color="primary-dark">
                      {tab}
                    </TabItem>
                  )
                }
              </TabList>
              <TabContentContainer>
                {/* Tab 1 */}
                <TabContent openedTab={openedTab} thisTab={1}>
                  <h2 className="text-2xl font-bold	text-black antialiased">Judul Ujian</h2>
                  <p className="mb-2 antialiased">Deskripsi Ujian</p>
                  <ExamInformation  />
                </TabContent>
                {/* Tab 2 */}
                <TabContent openedTab={openedTab} thisTab={2}>
                  <div className="mb-2 flex justify-end items-baseline">
                    <Button.Primary onClick={() => setIsImportQuestionModalShow(true)}>
                      Impor Soal
                    </Button.Primary>
                  </div>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <h2 className="text-2xl font-bold	text-black antialiased">Soal</h2>
                    <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />}/>
                  </div>
                  {/* Question Table */}
                  <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
                    <thead className="bg-primary">
                      <tr>
                        <Th>
                          Pertanyaan
                        </Th>
                        <Th className="text-center">
                          Jawaban
                        </Th>
                        <Th className="text-center">
                          Aksi
                        </Th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <Td className="">Nomor massa dari Ar18</Td>
                        <Td className="text-center">
                          <span className="border border-green-400 bg-green-100 text-green-400 px-2 py-1 rounded">A</span>
                        </Td>
                        <Td className=" flex justify-center space-x-2">
                          <Link href={`/learning-materials/update/`}>
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
                  <ExamInformation  />
                </TabContent>
                {/* Tab 3 */}
                <TabContent openedTab={openedTab} thisTab={3}>
                  <div className="flex justify-between space-y-3 items-baseline flex-wrap">
                    <h2 className="text-2xl font-bold	text-black antialiased">Hasil</h2>
                    <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />}/>
                  </div>
                  <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
                    <thead className="bg-primary">
                      <tr>
                        <Th>
                          Siswa
                        </Th>
                        <Th className="text-center">
                          Nilai
                        </Th>
                        <Th className="text-center">
                          Aksi
                        </Th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <Td className="">Koo</Td>
                        <Td className="text-center">
                          <span className="border border-green-400 bg-green-100 text-green-400 px-2 py-1 rounded">100</span>
                        </Td>
                        <Td className=" flex justify-center space-x-2">
                          <Link href={`/learning-materials/update/`}>
                            <a className="btn btn-primary inline-flex items-center">
                              <SolidIcon.Eye className="-ml-1 mr-1 h-5 w-5" />
                              Lihat Hasil
                            </a>
                          </Link>
                        </Td>
                      </tr>
                      <tr>
                        <Td className="">Siswa yang tidak memenuhi KKM</Td>
                        <Td className="text-center">
                          <span className="border border-red-400 bg-red-100 text-red-400 px-2 py-1 rounded">99</span>
                        </Td>
                        <Td className=" flex justify-center space-x-2">
                          <Link href={`/learning-materials/update/`}>
                            <a className="btn btn-primary inline-flex items-center">
                              <SolidIcon.Eye className="-ml-1 mr-1 h-5 w-5" />
                              Lihat Hasil
                            </a>
                          </Link>
                        </Td>
                      </tr>
                    </tbody>
                  </Table>
                  <Pagination />
                  <ExamInformation  />
                </TabContent>
                {/* Tab 4 */}
                <TabContent openedTab={openedTab} thisTab={4}>
                  <form>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Judul Ujian</label>
                        <input id="title" name="title" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Judul Ujian" />
                      </div>
                      <div className="col-span-3 sm:col-span-3">
                        <label htmlFor="exam_description" className="block text-sm font-medium text-gray-700">Deskripsi Ujian</label>
                        <input id="exam_description" name="exam_description" type="text" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Deskripsi Ujian" />
                      </div>
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor="start-date" className="block text-sm leading-5 font-medium text-gray-700">Tanggal Mulai</label>
                        <DatePicker
                          id="start-date"
                          onChange={setStartDate}
                          date={startDate}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor="time-input" className="block text-sm leading-5 font-medium text-gray-700">Waktu Mulai</label>
                        <div className="flex shadow-md">
                          <TimeInput id="time-input" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm flex-grow border-r-0"  />
                          <button
                            className="bg-gray-300 rounded-r-md flex items-center justify-center text-sm font-semibold px-2 focus:outline-none"
                            type="button"
                            onClick={onButtonClick}
                          >
                            <OutlineIcon.Clock className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor="end-date" className="block text-sm leading-5 font-medium text-gray-700">Tanggal Selesai</label>
                        <DatePicker
                          onChange={setEndDate}
                          date={endDate}
                          id="end-date"
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor="time-input" className="block text-sm leading-5 font-medium text-gray-700">Waktu Selesai</label>
                        <div className="flex shadow-md">
                          <TimeInput id="time-input" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-l-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm flex-grow border-r-0"  />
                          <button
                            className="bg-gray-300 rounded-r-md flex items-center justify-center text-sm font-semibold px-2 focus:outline-none"
                            type="button"
                            onClick={onButtonClick}
                          >
                            <OutlineIcon.Clock className="h-6 w-6" />
                          </button>
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Durasi (Dalam menit)</label>
                        <input id="duration" name="duration" type="number" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="Durasi Ujian" />
                      </div>
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor="minimum-score" className="block text-sm font-medium text-gray-700">KKM</label>
                        <input id="minimum-score" name="minimum-score" type="number" required className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm" placeholder="KKM" />
                      </div>
                    </div>
                    <Button.Primary className="inline-flex items-center my-4">
                      <SolidIcon.Save className="-ml-1 mr-1 h-5 w-5" />
                      Simpan
                    </Button.Primary>
                  </form>
                  <ExamInformation  />
                </TabContent>
              </TabContentContainer>
            </Tab>
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default ExamRoomForTeacher;