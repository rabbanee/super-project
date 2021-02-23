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
import { useRef, useState } from "react";
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
import { Link as LinkScroll } from 'react-scroll';

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
  const [selectedShowEntry, setSelectedShowEntry] = useState(showEntries[0]);
  const [date, setDate] = useState(new Date());
  const timeInputRef: any = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    console.log(timeInputRef);
    
    // timeInputRef.current.focus();
  };
  return (
    <>
      <LayoutWithSidebar title={`Ruang Ujian (${tabs[openedTab-1]})`} user={user}>
        <Container>
          <ContainerBody className="rounded-b-lg">
            <h1 className="text-3xl font-bold	text-black mb-1 antialiased">{`Ruang Ujian (${tabs[openedTab-1]})`}</h1>
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
                <TabContent openedTab={openedTab} thisTab={1}>
                  <h2 className="text-2xl font-bold	text-black antialiased">Judul Ujian</h2>
                  <p className="mb-2 antialiased">Deskripsi Ujian</p>
                  <ExamInformation  />
                </TabContent>
                <TabContent openedTab={openedTab} thisTab={2}>
                  <div className="mb-2">
                    <h2 className="text-2xl font-bold	text-black antialiased">Soal</h2>
                    <Button.Primary>
                      Impor Soal
                    </Button.Primary>
                  </div>
                  <ExamInformation  />
                </TabContent>
                <TabContent openedTab={openedTab} thisTab={3}>
                  <h2 className="text-2xl font-bold	text-black antialiased">Hasil</h2>
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
                        <label htmlFor="date-picker" className="block text-sm leading-5 font-medium text-gray-700">Tanggal Mulai</label>
                        <DatePicker
                          onChange={setDate}
                          date={date}
                        />
                      </div>
                      <div className="col-span-3 sm:col-span-1">
                        <label htmlFor="time-input" className="block text-sm leading-5 font-medium text-gray-700">Waktu Mulai</label>
                        <div className="flex shadow-md">
                          <TimeInput id="time-input" className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-dark focus:border-primary-dark focus:z-10 sm:text-sm flex-grow border-r-0"  />
                          <button
                            className="bg-green-300 rounded-r flex items-center justify-center text-sm font-semibold px-2 focus:outline-none"
                            type="button"
                            onClick={onButtonClick}
                          >
                            <OutlineIcon.Clock className="h-6 w-6 text-green-700" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
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