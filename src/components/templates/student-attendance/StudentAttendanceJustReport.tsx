import attendanceStatuses from "@data/attendance-statuses";
import dummyStudents from "@data/dummies/students";
import { monthNames } from "@data/months";
import ContainerBody from "@elements/container/Body";
import Container from "@elements/container/Index";
import StatusPill from "@elements/StatusPill";
import Table from "@elements/Table";
import Td from "@elements/Td";
import Th from "@elements/Th";
import { User } from "@interface/User";
import LayoutWithSidebar from "@layouts/LayoutWithSidebar";
import ListBox from "@modules/ListBox";
import { rangeOfYears } from "@utils/rangeOfYears";
import * as Button from '@elements/Button';
import Title from "@elements/Title";
import { useState } from "react";
import axios from "axios";
import convertMonthNameToMonthNumber from "@utils/convertMonthNameToMonthNumber";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import * as OutlineIcon from '@elements/icon/Outline';
import { showAlert } from "@actions/index";

interface StudentAttendanceJustReportProps {
  user: User,
  permissions: any,
}

const StudentAttendanceJustReport = ({ user, permissions }: StudentAttendanceJustReportProps) => {
  const [studentAttendanceReport, setStudentAttendanceReport] = useState(null);
  const [selectedMonthName, setSelectedMonthName] = useState(monthNames[0]);
  const [selectedYear, setSelectedYear] = useState(2020);
  const [currentData, setCurrentData] = useState({
    monthName: '',
    year: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get('token'); 
  const dispatch: Function = useDispatch();

  const viewHandler = async () => {
    let response: any;
    setIsLoading(true);
    const selectedMonthNumber = convertMonthNameToMonthNumber(selectedMonthName);
    try {
      response = await axios.get(`${process.env.NEXT_PUBLIC_API_HOST}student-attendance/recap/${selectedMonthNumber}/${selectedYear}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
    } catch (error) {
      if (error?.response?.data?.message) {
        dispatch(showAlert({
          title: `${error?.response?.data?.message}`,
          type: 'error'
        }));
      } else {
        dispatch(showAlert({
          title: 'Terjadi Kesalahan',
          type: 'error'
        }));
      }
      setIsLoading(false);
      return error;
    }
    console.log(response.data);
    setCurrentData({
      monthName: selectedMonthName,
      year: selectedYear.toString(),
    });
    setStudentAttendanceReport(response.data);
    setIsLoading(false);
  };

  return (
    <LayoutWithSidebar user={user} title="Kehadiran Siswa (Laporan)" permissions={permissions}>
      <Container>
        <ContainerBody className="rounded-b-xl">
          <Title>Kehadiran Siswa (Laporan)</Title>
          <div className={`flex md:space-x-6 md:items-end flex-col items-start space-y-3 md:flex-row`} id="link1">
            <ListBox items={monthNames} label="Bulan" className="w-40" selectedItem={selectedMonthName} setSelectedItem={setSelectedMonthName}/>
            <ListBox items={rangeOfYears(2020)} label="Tahun" className="w-40" selectedItem={selectedYear} setSelectedItem={setSelectedYear}/>
            <div>
              <Button.Primary 
                className={`${isLoading && 'cursor-not-allowed'} group relative  flex justify-center`}
                disabled={isLoading}
                type="button" 
                onClick={viewHandler}
              >
                {
                  isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"  /> 
                }
                {
                  isLoading ? 'Memproses' : 'Lihat'
                }
              </Button.Primary>
            </div>
          </div>
          {
            studentAttendanceReport !== null && 
            <>
              <h2 className="text-2xl font-bold my-3">{`${currentData.monthName} ${currentData.year}`}</h2>
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
                      Array.apply(1, Array(studentAttendanceReport?.length > 0 ? 30 : 8)).map((e, i) => 
                        <Th className="text-gray-500 text-xs uppercase" key={i}>
                          {i+1}
                        </Th>
                      )
                    }
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {
                    studentAttendanceReport?.length > 0 && studentAttendanceReport?.map((student, studentIndex) => 
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
                    studentAttendanceReport?.length === 0 && 
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
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  );
};

export default StudentAttendanceJustReport;