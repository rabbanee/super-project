import grades from '@data/grades';
import React from 'react';
import * as Button from '@elements/Button';
import ListBox from '@modules/ListBox';
import { monthNames } from '@data/months';
import { rangeOfYears } from '@utils/rangeOfYears';
import StatusPill from '@elements/StatusPill';
import attendanceStatuses from '@data/attendance-statuses';
import dummyStudents from '@data/dummies/students';
import Table from '@elements/Table';
import Th from '@elements/Th';
import Td from '@elements/Td';

const Tab2 = ({ openTab }) => {
  return (
    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
      <div className={`flex md:space-x-6 md:items-end flex-col items-start space-y-3 md:flex-row`} id="link1">
        <ListBox items={grades} label="Kelas"/>
        <ListBox items={monthNames} label="Bulan" className="w-40"/>
        <ListBox items={rangeOfYears(2020)} label="Tahun" className="w-40"/>
        <div>
          <Button.Primary type="button">Lihat</Button.Primary>
        </div>
      </div>
      <h2 className="text-2xl font-bold my-3">Februari 2020</h2>
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
            <Th className="text-gray-500">
              Siswa
            </Th>
            {
              Array.apply(1, Array(30)).map((e, i) => 
                <Th className="text-gray-500" key={i}>
                  {i+1}
                </Th>
              )
            }
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {
            dummyStudents.map((dummyUser, dummyUserIndex) => 
            <tr key={dummyUserIndex}>
              <Td>
                <span>{ dummyUser }</span>
              </Td>
              {
                Array.apply(1, Array(30)).map((e, i) => 
                  <Td key={i}>
                    <StatusPill className={`bg-green-500`}/>
                  </Td>
                )
              }
            </tr>
            )
          }
        </tbody>
      </Table>
    </div>
  );
};

export default Tab2;