import { DatePicker } from "./Datepicker";
import ListBox from "./ListBox";
import * as Button from '@elements/Button';
import Table from "@elements/Table";
import Th from "@elements/Th";
import Td from "@elements/Td";
import attendanceStatuses from "@data/attendance-statuses";
import * as OutlineIcon from '@elements/icon/Outline';
import { MouseEventHandler } from "react";
import * as SolidIcon from '@elements/icon/Solid';

type StudentAttendanceCRUDProps = {
  gradeNames: Array<any>,
  date: any,
  setDate: (date: Date) => void,
  selectedGradeName: string,
  setSelectedGradeName: Function,
  viewHandler: MouseEventHandler<HTMLButtonElement>, 
  studentAttendance?: Array<any>,
  students?: Array<any>,
  isLoading: boolean,
  isViewing: boolean,
  onSaveHandler: MouseEventHandler<HTMLButtonElement>,
  onDeleteHandler: MouseEventHandler<HTMLButtonElement>,
};

const StudentAttendanceCRUD = ({ gradeNames, date, setDate, selectedGradeName, setSelectedGradeName, viewHandler, studentAttendance, students, isLoading, onSaveHandler, isViewing, onDeleteHandler }: StudentAttendanceCRUDProps) => {
  return (
    <>
      <div className={`flex md:space-x-6 md:items-end flex-col items-start space-y-4 md:flex-row`} id="link1">
        {
          gradeNames.length > 0 && (
            <ListBox items={gradeNames} label="Kelas" selectedItem={selectedGradeName} setSelectedItem={setSelectedGradeName} />
          )
        }
        <div>
          <label htmlFor="date-picker" className="block text-sm leading-5 font-medium text-gray-700">Tanggal</label>
          <DatePicker
            onChange={setDate}
            date={date}
          />
        </div>
        <div>
          <Button.Primary  
            className={`${isViewing && 'cursor-not-allowed'} group relative  flex justify-center`}
            disabled={isViewing}
            type="button"
            onClick={viewHandler}
            >
              {
                isViewing && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"  /> 
              }
              {
                isViewing ? 'Memproses' : 'Lihat'
              }
          </Button.Primary>
        </div>
      </div>
      {
        studentAttendance !== null || students !== null ? ( 
        <>
          {
            (studentAttendance !== null && studentAttendance?.length > 0) && 
            <div className="flex justify-end items-baseline">
              <Button.Danger onClick={onDeleteHandler} type="button" className="inline-flex items-center">
                <SolidIcon.Trash className="-ml-1 mr-1 h-5 w-5" /> 
                Hapus
              </Button.Danger>
            </div>
          }
          <Table color="gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <Th className="text-gray-500 text-xs uppercase">
                    Siswa
                  </Th>
                  <Th className="text-gray-500 text-xs uppercase">
                    Status
                  </Th>
                </tr>
              </thead>
              <tbody>
                  {
                  studentAttendance?.length > 0 && studentAttendance.map((studentAttendance, studentAttendanceIndex) => 
                    <tr key={`${studentAttendanceIndex}-${studentAttendance.student.id}`} className="even:bg-gray-50">
                      <Td className="text-xs uppercase">
                        <span>{ studentAttendance.student.user.name }</span>
                      </Td>
                      <Td className="flex space-x-1 text-xs uppercase">
                        {
                          attendanceStatuses.map((attendanceStatus, attendanceStatusIndex) => 
                            <div key={attendanceStatusIndex}>
                              <input className="hidden" type="radio" name={`${studentAttendance.student.id}`} value={`${attendanceStatus.name}`} id={`${studentAttendance.student.id}-${attendanceStatus.name}`} defaultChecked={ attendanceStatus.name === studentAttendance.status } />
                              <label htmlFor={`${studentAttendance.student.id}-${attendanceStatus.name}`} className={`border label-checked:bg-${attendanceStatus.color} px-2 py-2 border-${attendanceStatus.color} label-checked:text-white rounded cursor-pointer`}>
                                { attendanceStatus.name  }
                              </label>
                            </div>
                          )
                        }
                      </Td>
                    </tr>
                  )
                }
                {
                  students?.length > 0 && students.map((student, studentIndex) => 
                    <tr key={`${studentIndex}-${student.id}`} className="even:bg-gray-50">
                      <Td className="text-xs uppercase">
                        <span>{ student.user.name }</span>
                      </Td>
                      <Td className="flex space-x-1 text-xs uppercase">
                        {
                          attendanceStatuses.map((attendanceStatus, attendanceStatusIndex) => 
                            <div key={attendanceStatusIndex}>
                              <input className="hidden" type="radio" name={`${student.id}`} value={`${attendanceStatus.name}`} id={`${student.id}-${attendanceStatus.name}`} defaultChecked={ attendanceStatus.name === 'Hadir' } />
                              <label htmlFor={`${student.id}-${attendanceStatus.name}`} className={`border label-checked:bg-${attendanceStatus.color} px-2 py-2 border-${attendanceStatus.color} label-checked:text-white rounded cursor-pointer`}>
                                { attendanceStatus.name  }
                              </label>
                            </div>
                          )
                        }
                      </Td>
                    </tr>
                  )
                }
                {
                  (students?.length === 0 && studentAttendance?.length === 0) && <tr><Td colSpan={2} className="text-center">Tidak ada murid di kelas tersebut.</Td></tr>
                }
              </tbody>
            </Table>
            {
              studentAttendance?.length > 0 || students?.length > 0 ? 
              <div className="w-full flex justify-center mt-6">
                <Button.Primary  
                  className={`${isLoading && 'cursor-not-allowed'} group relative  flex justify-center`}
                  disabled={isLoading}
                  type="button"
                  onClick={onSaveHandler}
                  >
                    {
                      isLoading && <OutlineIcon.Circle className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"  /> 
                    }
                    {
                      isLoading ? 'Memproses' : 'Simpan'
                    }
                  </Button.Primary>
              </div> 
            : ''
            }
        </>
        ) : <></>
      }
    </>
  );
};

export default StudentAttendanceCRUD;