import { Listbox, Transition } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { listGrade } from '@data/listGrade';
import * as Icon from '@elements/Icon';
import { DatePicker } from '@modules/Datepicker';
import * as Button from '@elements/Button';

const Tab1 = ({openTab}) => {
  const [selectedClass, setSelectedClass] = useState(listGrade[0]);
  const [date, setDate] = useState(new Date());

  return (
    <div className={`${openTab !== 1 ? 'hidden' : '' }`}>
      <div className={`flex space-x-6 items-end`} id="link1">
        <div>
          <Listbox value={selectedClass} onChange={setSelectedClass}>
          {({open}) => (
            <>
              <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
                Kelas
              </Listbox.Label>
              <div className="relative w-20">
                <span className="inline-block w-full rounded-md shadow-md">
                  <Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-primary-dark focus:border-primary-dark transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                    <span className="block truncate">{selectedClass}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <Icon.Selector className="h-5 w-5 text-gray-400" />
                    </span>
                  </Listbox.Button>
                </span>
                <Transition
                  show={open}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10"
                >
                  <Listbox.Options
                    static
                    className="max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5"
                  >
                    {listGrade.map((grade, i) => (
                      <Listbox.Option key={i} value={grade}>
                        {({ selected, active }) => (
                          <div
                            className={`${
                              active
                                ? "text-white bg-primary-darkest"
                                : "text-gray-900"
                            } cursor-default select-none relative py-2 pl-8 pr-4`}
                          >
                            <span
                              className={`${
                                selected ? "font-semibold" : "font-normal"
                              } block truncate`}
                            >
                              {grade}
                            </span>
                            {selected && (
                              <span
                                className={`${
                                  active ? "text-white" : "text-primary-darkest"
                                } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                              >
                                <Icon.Check className="h-5 w-5" />
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
            )}
          </Listbox>
        </div>
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
              
                <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang ha</span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <label className="border-2 bg-green-300 px-2 py-2 border-green-300">
                      <input className=" checked:bg-transparent checked:border-transparent" type="radio" value="1"/>
                      <span>Hadir</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label l"  >
                      <input className="skwp-form-check-input" name="status_1489" id="l-2" type="radio" value="3"/>
                      <span>Telat</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label a">
                      <input className="skwp-form-check-input" name="status_1489" id="a-2" type="radio" value="2"/>
                      <span>Absent</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label i">
                      <input className="skwp-form-check-input" name="status_1489" id="i-2" type="radio" value="5"/>
                      <span>Izin</span>
                      <span className="background"></span>
                    </label>
                  </td>
               </tr>
               
               <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang </span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <label className="border-2 bg-green-300 px-2 py-2 border-green-300">
                      <input className=" checked:bg-transparent checked:border-transparent" type="radio" value="1"/>
                      <span>Hadir</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label l"  >
                      <input className="skwp-form-check-input" name="status_1489" id="l-2" type="radio" value="3"/>
                      <span>Telat</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label a">
                      <input className="skwp-form-check-input" name="status_1489" id="a-2" type="radio" value="2"/>
                      <span>Absent</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label i">
                      <input className="skwp-form-check-input" name="status_1489" id="i-2" type="radio" value="5"/>
                      <span>Izin</span>
                      <span className="background"></span>
                    </label>
                  </td>
               </tr>
               
               <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang ha</span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <label className="border-2 bg-green-300 px-2 py-2 border-green-300">
                      <input className=" checked:bg-transparent checked:border-transparent" type="radio" value="1"/>
                      <span>Hadir</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label l"  >
                      <input className="skwp-form-check-input" name="status_1489" id="l-2" type="radio" value="3"/>
                      <span>Telat</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label a">
                      <input className="skwp-form-check-input" name="status_1489" id="a-2" type="radio" value="2"/>
                      <span>Absent</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label i">
                      <input className="skwp-form-check-input" name="status_1489" id="i-2" type="radio" value="5"/>
                      <span>Izin</span>
                      <span className="background"></span>
                    </label>
                  </td>
               </tr>
               
               <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang ha</span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <label className="border-2 bg-green-300 px-2 py-2 border-green-300">
                      <input className=" checked:bg-transparent checked:border-transparent" type="radio" value="1"/>
                      <span>Hadir</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label l"  >
                      <input className="skwp-form-check-input" name="status_1489" id="l-2" type="radio" value="3"/>
                      <span>Telat</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label a">
                      <input className="skwp-form-check-input" name="status_1489" id="a-2" type="radio" value="2"/>
                      <span>Absent</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label i">
                      <input className="skwp-form-check-input" name="status_1489" id="i-2" type="radio" value="5"/>
                      <span>Izin</span>
                      <span className="background"></span>
                    </label>
                  </td>
               </tr>
               
               <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang ha</span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <label className="border-2 bg-green-300 px-2 py-2 border-green-300">
                      <input className=" checked:bg-transparent checked:border-transparent" type="radio" value="1"/>
                      <span>Hadir</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label l"  >
                      <input className="skwp-form-check-input" name="status_1489" id="l-2" type="radio" value="3"/>
                      <span>Telat</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label a">
                      <input className="skwp-form-check-input" name="status_1489" id="a-2" type="radio" value="2"/>
                      <span>Absent</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label i">
                      <input className="skwp-form-check-input" name="status_1489" id="i-2" type="radio" value="5"/>
                      <span>Izin</span>
                      <span className="background"></span>
                    </label>
                  </td>
               </tr>
               
               <tr>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Kang ha</span>
                  </td>
                  <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <label className="border-2 bg-green-300 px-2 py-2 border-green-300">
                      <input className=" checked:bg-transparent checked:border-transparent" type="radio" value="1"/>
                      <span>Hadir</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label l"  >
                      <input className="skwp-form-check-input" name="status_1489" id="l-2" type="radio" value="3"/>
                      <span>Telat</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label a">
                      <input className="skwp-form-check-input" name="status_1489" id="a-2" type="radio" value="2"/>
                      <span>Absent</span>
                      <span className="background"></span>
                    </label>
                    <label className="skwp-form-check-label i">
                      <input className="skwp-form-check-input" name="status_1489" id="i-2" type="radio" value="5"/>
                      <span>Izin</span>
                      <span className="background"></span>
                    </label>
                    
                  </td>
               </tr>
               
              
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tab1;