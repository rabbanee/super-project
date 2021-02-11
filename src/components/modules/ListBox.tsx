import { Listbox, Transition } from '@headlessui/react';
import React, { useState } from 'react';
import * as OutlineIcon from '@elements/Icon/Outline';
import * as SolidIcon from '@elements/Icon/Solid';

const ListBox = ({ items, label, className, selectedItem, setSelectedItem}: 
  { items: Array<any>, label: String, className?: String, selectedItem?: any, setSelectedItem?: any }) => {
  const [selected, setSelected] = useState(items[0]);
  return (
    <div>
      <Listbox value={selectedItem || selected} onChange={setSelectedItem || setSelected}>
      {({open}) => (
        <>
          <Listbox.Label className="block text-sm leading-5 font-medium text-gray-700">
            { label }
          </Listbox.Label>
          <div className={`${className && className} relative min-w-20`}>
            <span className="inline-block w-full rounded-md shadow-md">
              <Listbox.Button className="cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-10 py-2 text-left focus:outline-none focus:shadow-outline-primary-dark focus:border-primary-dark transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                <span className="block truncate">{selectedItem || selected}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <OutlineIcon.Selector className="h-5 w-5 text-gray-400" />
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
                {items.map((item: any, i: any) => (
                  <Listbox.Option key={i} value={item}>
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
                          { item }
                        </span>
                        {selected && (
                          <span
                            className={`${
                              active ? "text-white" : "text-primary-darkest"
                            } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                          >
                            <SolidIcon.Check className="h-5 w-5" />
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
  );
};

export default ListBox;