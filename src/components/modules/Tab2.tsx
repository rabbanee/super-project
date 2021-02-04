import { listGrade } from '@data/grades';
import React, { useState } from 'react';
import * as Button from '@elements/Button';
import ListBox from '@modules/ListBox';
import { monthNames } from '@data/months';
import { rangeOfYears } from '@utils/rangeOfYears';
import StatusPill from '@elements/StatusPill';
import { attendanceStatuses } from '@data/attendanceStatuses';

const Tab2 = ({ openTab }) => {

  return (
    <div className={openTab === 2 ? "block" : "hidden"} id="link2">
      <div className={`flex md:space-x-6 md:items-end flex-col items-start space-y-3 md:flex-row`} id="link1">
        <ListBox items={listGrade} label="Kelas"/>
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
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-2">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Siswa
                  </th>
                  {
                    Array.apply(1, Array(30)).map((e, i) => 
                      <th key={i} scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {i+1}
                      </th>
                    )
                  }
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang ha</span>
                  </td>
                  {
                    Array.apply(1, Array(30)).map((e, i) => 
                      <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={i}>
                        <StatusPill className={`bg-green-500`}/>
                      </td>
                    )
                  }
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab2;