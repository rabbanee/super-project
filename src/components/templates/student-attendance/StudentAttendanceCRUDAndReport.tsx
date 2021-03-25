import attendanceStatuses from '@data/attendance-statuses';
import dummyStudents from '@data/dummies/students';
import { monthNames } from '@data/months';
import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import StatusPill from '@elements/StatusPill';
import Tab from '@elements/Tab';
import TabContent from '@elements/TabContent';
import TabContentContainer from '@elements/TabContentContainer';
import TabItem from '@elements/TabItem';
import Table from '@elements/Table';
import TabList from '@elements/TabList';
import Td from '@elements/Td';
import Th from '@elements/Th';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import ConfirmationModal from '@modules/ConfirmationModal';
import { DatePicker } from '@modules/Datepicker';
import ListBox from '@modules/ListBox';
import { rangeOfYears } from '@utils/rangeOfYears';
import * as SolidIcon from '@elements/icon/Solid';
import * as Button from '@elements/Button';
import { useEffect, useMemo, useRef, useState } from 'react';
import { User } from '@interface/User';
import axios from 'axios';
import Cookie from 'js-cookie';
import convertDateToYYYYMMDD from '@utils/convertDateToYYYYMMDD';
import { useDispatch } from 'react-redux';
import StudentAttendanceCRUD from '@modules/StudentAttendanceCRUD';
import { showAlert } from '@actions/index';
import * as OutlineIcon from '@elements/icon/Outline';
import convertMonthNameToMonthNumber from '@utils/convertMonthNameToMonthNumber';

interface StudentAttendanceCRUDAndReportProps {
  user: User,
  permissions: any,
}

const initialPayload = (date) => {
  return  {
      date,
      student_attendance: [],
    };
}

const StudentAttendanceCRUDAndReport =  ({ user, permissions }: StudentAttendanceCRUDAndReportProps) => {
  const [openedTab, setOpenedTab] = useState(1);
  const [date, setDate] = useState(new Date());
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [studentAttendance, setStudentAttendance] = useState(null);
  const [students, setStudents] = useState(null);
  const [grades, setGrades] = useState([]);
  const [gradeNames, setGradeNames] = useState([]);
  const [selectedGradeName, setSelectedGradeName] = useState(gradeNames[0]);
  const token = Cookie.get('token');
  const [payload, setPayload] = useState(() => initialPayload(convertDateToYYYYMMDD(date)));
  const dispatch: Function = useDispatch();
  const [isViewing, setIsViewing] = useState(false);
  const [studentAttendanceReport, setStudentAttendanceReport] = useState(null);
  const [selectedMonthName, setSelectedMonthName] = useState(monthNames[0]);
  const [selectedYear, setSelectedYear] = useState(rangeOfYears(2020)[0]);
  const [isGettingReport, setIsGettingReport] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');

  const viewHandler = async () => {
    setIsViewing(true);
    const selectedGrade = grades.find((grade) => {
      return grade.name === selectedGradeName;
    });
    setPayload(initialPayload(convertDateToYYYYMMDD(date)));
    await getStudentAttendance({
      date: convertDateToYYYYMMDD(date),
      gradeId: selectedGrade.id,
    });
    setIsViewing(false);
  }

  const getStudentAttendance = async ({ date, gradeId }) => {
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}student-attendance/${date}/${gradeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error);
      return;
    }
    if (!response.data.student_attendance) {
      setStudentAttendance([]);
      setStudents(response.data.students);
    } else {
      setStudents([]);
      setStudentAttendance(response.data.student_attendance);
    }
    
  };

  const getGrades = async () => {
    let response;
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}grades`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
    let grades = response.data;
    let gradeNames = [];
    (grades).forEach(item => {
      gradeNames.push(item.name);
    });
    setGradeNames(gradeNames);
    setGrades(grades);
    setSelectedGradeName(gradeNames[0]);
  };

  useEffect(()=> {
    getGrades();
  }, []);

  const recapHandler = async () => {
   setIsGettingReport(true);
   let response;
   const currentMonth = selectedMonthName;
   const currentYear = selectedYear;
   const selectedGrade = grades.find((grade) => grade.name === selectedGradeName);
   const selectedMonthNumber = convertMonthNameToMonthNumber(currentMonth);
   
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}student-attendance/recap/${selectedGrade.id}/${selectedMonthNumber}/${currentYear}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      return error;
    }
    setStudentAttendanceReport(response.data);
    setCurrentMonth(currentMonth);
    setCurrentYear(currentYear);
    setIsGettingReport(false);
  }

  const updateStudentAttendance = async (payload) => {
    let response;
    try {
      response = await axios.put(`${process.env.NEXT_PUBLIC_API_HOST}student-attendance/${payload.date}`, payload, {
       headers: {
          'Authorization': `Bearer ${token}`,
        }
    });
    } catch (error) {
      const { data } = error.response;
      console.log(data);
      if (data.errors) {
        dispatch(showAlert({
          title: data.message || 'Terjadi Kesalahan',
          description: data.errors[Object.keys(data.errors)[0]] || 'Mohon coba kembali :)',
          type: 'error'
        }));
      }
      return error;
    }
    dispatch(showAlert({
      description: 'Berhasil menyimpan kehadiran siswa!',
      type: 'success'
    }));
    return response;
  };

  const storeStudentAttendance = async (payload) => {
    let response;
    try {
      response = await axios.post(`${process.env.NEXT_PUBLIC_API_HOST}student-attendance`, payload, {
       headers: {
          'Authorization': `Bearer ${token}`,
        }
    });
    } catch (error) {
      console.log(error);
      return error;
    }
    dispatch(showAlert({
      description: 'Berhasil menyimpan kehadiran siswa!',
      type: 'success'
    }));
    return response;
  };

  const onSaveHandler = async (e) => {
    let response;
    setIsSaving(true);
    let checkedInputs = document.querySelectorAll('input[type=radio]:checked');
    // checkedInputs = Array.from(checkedInputs);
    const studentAttendance = Array.from(checkedInputs, (checkedInput: any) => {
      return {
        student_id: checkedInput.name,
        status: checkedInput.value,
      }
    });
    // const studentAttendance = [...checkedInputs].map((checkedInput: any) => {
    //   return {
    //     student_id: checkedInput.name,
    //     status: checkedInput.value,
    //   }
    // });
    setPayload({
      ...payload,
      student_attendance: studentAttendance,
    });
     if (students.length !== 0) {
      await storeStudentAttendance({
        ...payload,
        student_attendance: studentAttendance,
      });
    } else {
      await updateStudentAttendance({
        ...payload,
        student_attendance: studentAttendance,
      });
    }
    setIsSaving(false);
  };

  const deleteStudentAttendance = async () => {
    let response: any;
    try {
      response = await axios.delete(`${process.env.NEXT_PUBLIC_API_HOST}student-attendance/${payload.date}/${studentAttendance[0].student.grade_id}`, {
        headers: {
          'Authorization':  `Bearer ${token}`,
        }
      });
    } catch (error) {
      console.log('error: ', error);
      return error;
    }
    dispatch(showAlert({
      title: response.data.message || 'Berhasil menghapus kehadiran siswa!',
      type: 'success',
    }));
    setIsConfirmationModalShow(false);
    setStudentAttendance(null);
    setStudents(null);
  };

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Kehadiran Siswa" description="Apakah Anda yakin ingin menghapus kehadiran siswa ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" onConfirm={deleteStudentAttendance} /> 
      <LayoutWithSidebar title="Kehadiran Siswa" user={user} permissions={permissions}>
        <Container className="relative">
          <ContainerBody className="rounded-b-xl">
              <h1 className="text-3xl font-bold	text-black mb-2">{`Kehadiran Siswa (${openedTab === 1 ? 'Pengelolaan' : 'Laporan'})`}</h1>
              <Tab color="primary-dark" openTab={openedTab} setOpenTab={setOpenedTab}>
                <TabList>
                  <TabItem openedTab={openedTab} thisTab={1} setOpenedTab={setOpenedTab} color="primary-darkest" href="#management">
                    Pengelolaan
                  </TabItem>
                  <TabItem openedTab={openedTab} thisTab={2} setOpenedTab={setOpenedTab} color="primary-darkest" href="#report">
                    Laporan
                  </TabItem>
                </TabList>
                <TabContentContainer>
                  <TabContent openedTab={openedTab} thisTab={1}>
                    <StudentAttendanceCRUD onDeleteHandler={() => setIsConfirmationModalShow(true)} gradeNames={gradeNames} date={date} setDate={setDate} selectedGradeName={selectedGradeName} setSelectedGradeName={setSelectedGradeName} viewHandler={viewHandler} studentAttendance={studentAttendance} students={students} isLoading={isSaving} onSaveHandler={onSaveHandler} isViewing={isViewing}/>
                  </TabContent>
                  {/* Tab Content for Report */}
                  <TabContent openedTab={openedTab} thisTab={2}>
                    <div className={`flex md:space-x-6 md:items-end flex-col items-start space-y-3 md:flex-row`} id="link1">
                      {
                        gradeNames.length > 0 && (
                          <ListBox items={gradeNames} label="Kelas" selectedItem={selectedGradeName} setSelectedItem={setSelectedGradeName} />
                        )
                      }
                      <ListBox items={monthNames} label="Bulan" className="w-40" selectedItem={selectedMonthName} setSelectedItem={setSelectedMonthName}/>
                      <ListBox items={rangeOfYears(2020)} label="Tahun" className="w-40" selectedItem={selectedYear} setSelectedItem={setSelectedYear}/>
                      <div>
                        <Button.Primary  
                          className={`${isGettingReport && 'cursor-not-allowed'} group relative  flex justify-center`}
                          disabled={isGettingReport}
                          type="button"
                          onClick={recapHandler}
                          >
                            {
                              isGettingReport && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"  /> 
                            }
                            {
                              isGettingReport ? 'Memproses' : 'Lihat'
                            }
                        </Button.Primary>
                      </div>
                    </div>
                    {
                      studentAttendanceReport !== null && 
                      <>
                        <h2 className="text-2xl font-bold my-3">{`${currentMonth} ${currentYear}`}</h2>
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
                                Array.apply(1, Array(studentAttendanceReport.length > 0 ? 30 : 8)).map((e, i) => 
                                  <Th className="text-gray-500 text-xs uppercase" key={i}>
                                    {i+1}
                                  </Th>
                                )
                              }
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {
                              studentAttendanceReport.length > 0 && studentAttendanceReport.map((student, studentIndex) => 
                              <tr key={studentIndex}>
                                <Td className="text-xs uppercase">
                                  <span>{ student.name }</span>
                                </Td>
                                {
                                  Array.apply(1, Array(30)).map((e, i) => 
                                    <Td className="text-xs uppercase" key={i}>
                                      <StatusPill className={`bg-${attendanceStatuses.find(attendanceStatus => attendanceStatus.name === (student.attendances.find((attendance, attendanceIndex) => parseInt(attendance.date.split('-')[2]) === i + 1)?.status))?.color}`}/>
                                    </Td>
                                  )
                                }
                              </tr>
                              )
                            }
                            {
                              studentAttendanceReport.length === 0 && 
                              <tr>
                                <Td className="text-xs uppercase text-center" colSpan={30}>
                                  Kehadiran siswa tidak ditemukan!
                                </Td>
                              </tr>
                            }
                          </tbody>
                        </Table>
                      </>
                    }
                  </TabContent>
                </TabContentContainer>
              </Tab>
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default StudentAttendanceCRUDAndReport;