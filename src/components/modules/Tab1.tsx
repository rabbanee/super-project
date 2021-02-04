import { useEffect, useState } from 'react';
import { listGrade } from '@data/grades';
import { DatePicker } from '@modules/Datepicker';
import * as Button from '@elements/Button';
import ListBox from '@modules/ListBox';
import { attendanceStatuses } from '@data/attendanceStatuses';

const Tab1 = ({openTab}) => {
  const [date, setDate] = useState(new Date());

  return (
    <div className={`${openTab !== 1 ? 'hidden' : '' }`}>
      <div className={`flex md:space-x-6 md:items-end flex-col items-start space-y-4 md:flex-row`} id="link1">
        <ListBox items={listGrade} label="Kelas" />
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
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 mt-2">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Siswa
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang ha</span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex space-x-1">
                    {
                      attendanceStatuses.map((attendanceStatus, index) => 
                        <div key={index}>
                          <input className="hidden" type="radio" name="option" value={`${index + 1}`} id={`${index + 1}`} defaultChecked={attendanceStatus.name === 'Hadir'}/>
                          <label htmlFor={`${index + 1}`} className={`border label-checked:bg-${attendanceStatus.color} px-2 py-2 border-${attendanceStatus.color} label-checked:text-white rounded cursor-pointer`}>
                            { attendanceStatus.name  }
                          </label>
                        </div>
                      )
                    }
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang cut</span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex space-x-1">
                      <div>
                        <input className="hidden" type="radio" name="option" value="1" id="1"/>
                        <label htmlFor="1" className="border label-checked:bg-green-500 px-2 py-2 border-green-500 label-checked:text-white rounded cursor-pointer">
                          Hadir
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="2" id="2"/>
                        <label htmlFor="2" className="border label-checked:bg-yellow-500 px-2 py-2 border-yellow-500 label-checked:text-white rounded cursor-pointer">
                          Telat
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="3" id="3"/>
                        <label htmlFor="3" className="border label-checked:bg-red-500 px-2 py-2 border-red-500 label-checked:text-white rounded cursor-pointer">
                          Absen
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="4" id="4"/>
                        <label htmlFor="4" className="border label-checked:bg-yellow-600 px-2 py-2 border-yellow-600 label-checked:text-white rounded cursor-pointer">
                          Sakit
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="5" id="5"/>
                        <label htmlFor="5" className="border label-checked:bg-gray-600 px-2 py-2 border-gray-600 label-checked:text-white rounded cursor-pointer">
                          Izin
                        </label>
                      </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang pred</span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex space-x-1">
                      <div>
                        <input className="hidden" type="radio" name="option" value="1" id="1"/>
                        <label htmlFor="1" className="border label-checked:bg-green-500 px-2 py-2 border-green-500 label-checked:text-white rounded cursor-pointer">
                          Hadir
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="2" id="2"/>
                        <label htmlFor="2" className="border label-checked:bg-yellow-500 px-2 py-2 border-yellow-500 label-checked:text-white rounded cursor-pointer">
                          Telat
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="3" id="3"/>
                        <label htmlFor="3" className="border label-checked:bg-red-500 px-2 py-2 border-red-500 label-checked:text-white rounded cursor-pointer">
                          Absen
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="4" id="4"/>
                        <label htmlFor="4" className="border label-checked:bg-yellow-600 px-2 py-2 border-yellow-600 label-checked:text-white rounded cursor-pointer">
                          Sakit
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="5" id="5"/>
                        <label htmlFor="5" className="border label-checked:bg-gray-600 px-2 py-2 border-gray-600 label-checked:text-white rounded cursor-pointer">
                          Izin
                        </label>
                      </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang bungkus</span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex space-x-1">
                      <div>
                        <input className="hidden" type="radio" name="option" value="1" id="1"/>
                        <label htmlFor="1" className="border label-checked:bg-green-500 px-2 py-2 border-green-500 label-checked:text-white rounded cursor-pointer">
                          Hadir
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="2" id="2"/>
                        <label htmlFor="2" className="border label-checked:bg-yellow-500 px-2 py-2 border-yellow-500 label-checked:text-white rounded cursor-pointer">
                          Telat
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="3" id="3"/>
                        <label htmlFor="3" className="border label-checked:bg-red-500 px-2 py-2 border-red-500 label-checked:text-white rounded cursor-pointer">
                          Absen
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="4" id="4"/>
                        <label htmlFor="4" className="border label-checked:bg-yellow-600 px-2 py-2 border-yellow-600 label-checked:text-white rounded cursor-pointer">
                          Sakit
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="5" id="5"/>
                        <label htmlFor="5" className="border label-checked:bg-gray-600 px-2 py-2 border-gray-600 label-checked:text-white rounded cursor-pointer">
                          Izin
                        </label>
                      </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang jet</span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider flex space-x-1">
                      <div>
                        <input className="hidden" type="radio" name="option" value="1" id="1"/>
                        <label htmlFor="1" className="border label-checked:bg-green-500 px-2 py-2 border-green-500 label-checked:text-white rounded cursor-pointer">
                          Hadir
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="2" id="2"/>
                        <label htmlFor="2" className="border label-checked:bg-yellow-500 px-2 py-2 border-yellow-500 label-checked:text-white rounded cursor-pointer">
                          Telat
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="3" id="3"/>
                        <label htmlFor="3" className="border label-checked:bg-red-500 px-2 py-2 border-red-500 label-checked:text-white rounded cursor-pointer">
                          Absen
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="4" id="4"/>
                        <label htmlFor="4" className="border label-checked:bg-yellow-600 px-2 py-2 border-yellow-600 label-checked:text-white rounded cursor-pointer">
                          Sakit
                        </label>
                      </div>
                      <div>
                        <input className="hidden" type="radio" name="option" value="5" id="5"/>
                        <label htmlFor="5" className="border label-checked:bg-gray-600 px-2 py-2 border-gray-600 label-checked:text-white rounded cursor-pointer">
                          Izin
                        </label>
                      </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab1;