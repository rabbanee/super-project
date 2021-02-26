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

interface StudentAttendanceForStudentOrGuardianOfStudentProps {
  user: User,
}

const StudentAttendanceForStudentOrGuardianOfStudent = ({ user }: StudentAttendanceForStudentOrGuardianOfStudentProps) => {
  return (
    <LayoutWithSidebar user={user} title="Kehadiran Siswa (Laporan)">
      <Container>
        <ContainerBody className="rounded-b-xl">
          <Title>Kehadiran Siswa (Laporan)</Title>
          <div className={`flex md:space-x-6 md:items-end flex-col items-start space-y-3 md:flex-row`} id="link1">
            <ListBox items={monthNames} label="Bulan" className="w-40"/>
            <ListBox items={rangeOfYears(2020)} label="Tahun" className="w-40"/>
            <div>
              <Button.Primary type="button">
                Lihat
              </Button.Primary>
            </div>
          </div>
          <div className="flex justify-between items-baseline">
            <h2 className="text-2xl font-bold my-3">Februari 2020</h2>
          </div>
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
                  Array.apply(1, Array(30)).map((e, i) => 
                    <Th className="text-gray-500 text-xs uppercase" key={i}>
                      {i+1}
                    </Th>
                  )
                }
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <Td className="text-xs uppercase">
                  <span>Who?</span>
                </Td>
                {
                  Array.apply(1, Array(30)).map((e, i) => 
                    <Td className="text-xs uppercase" key={i}>
                      <StatusPill className={`bg-green-500`}/>
                    </Td>
                  )
                }
              </tr>
            </tbody>
          </Table>
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  );
};

export default StudentAttendanceForStudentOrGuardianOfStudent;