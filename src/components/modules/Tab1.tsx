import { useState } from 'react';
import grades from '@data/grades';
import { DatePicker } from '@modules/Datepicker';
import * as Button from '@elements/Button';
import ListBox from '@modules/ListBox';
import attendanceStatuses from '@data/attendance-statuses';
import dummyStudents from '@data/dummies/students';
import Table from '@elements/Table';
import Th from '@elements/Th';
import Td from '@elements/Td';

const Tab1 = ({openTab}) => {
  const [date, setDate] = useState(new Date());

  return (
    <div className={`${openTab !== 1 ? 'hidden' : '' }`}>
      <div className={`flex md:space-x-6 md:items-end flex-col items-start space-y-4 md:flex-row`} id="link1">
        <ListBox items={grades} label="Kelas" />
        <div>
          <label htmlFor="date-picker" className="block text-sm leading-5 font-medium text-gray-700">Tanggal</label>
          <DatePicker
            onChange={setDate}
            date={date}
          />
        </div>
        <div>
          <Button.Primary type="button">Lihat</Button.Primary>
        </div>
      </div>
      <Table color="gray-200">
        <thead className="bg-gray-50">
          <tr>
            <Th className="text-gray-500">
              Siswa
            </Th>
            <Th className="text-gray-500">
              Status
            </Th>
          </tr>
        </thead>
        <tbody>
          {
            dummyStudents.map((dummyUser, dummyUserIndex) => 
            <tr key={dummyUserIndex} className="even:bg-gray-50">
              <Td>
                <span>{ dummyUser }</span>
              </Td>
              <Td className="flex space-x-1">
                {
                  attendanceStatuses.map((attendanceStatus, attendanceStatusIndex) => 
                    <div key={attendanceStatusIndex}>
                      <input className="hidden" type="radio" name={`user-${dummyUserIndex}`} value={`${attendanceStatusIndex + 1}`} id={`${attendanceStatusIndex + 1}-user-${dummyUserIndex}`} defaultChecked={attendanceStatus.name === 'Hadir'}/>
                      <label htmlFor={`${attendanceStatusIndex + 1}-user-${dummyUserIndex}`} className={`border label-checked:bg-${attendanceStatus.color} px-2 py-2 border-${attendanceStatus.color} label-checked:text-white rounded cursor-pointer`}>
                        { attendanceStatus.name  }
                      </label>
                    </div>
                  )
                }
              </Td>
            </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  );
};

export default Tab1;