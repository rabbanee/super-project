import React from 'react';
import Table from "@elements/Table";
import Td from "@elements/Td";
import Th from "@elements/Th";
import { User } from "@interface/User";
import LayoutWithSidebar from "@layouts/LayoutWithSidebar";
import { withAuthServerSideProps } from "@lib/withAuthServerSide";


interface OnlineExamsProps {
  user: User,
}

const OnlineExams = ({ user }: OnlineExamsProps) => {
  return (
    <LayoutWithSidebar user={user} title="Rekap Pengguna">
      <div className="shadow-md container mx-auto rounded-xl">
        <div className="px-4 py-5 bg-white sm:p-6 rounded-t-xl">
          <h2 className="text-3xl font-bold	text-black mb-2"></h2>
          <div className="flex space-x-2 justify-end">
            {/* <RecapTypeButton recapTypes={recapTypes} activeRecapType={activeRecapType} setActiveRecapType={setActiveRecapType} /> */}
          </div>
          <div className="flex justify-between space-y-3">
            <div className="flex justify-center items-center space-x-1">
              <span className="text-md">Tampilkan</span>
              {/* <ListBox items={showEntries} selectedItem={selectedShowEntry} setSelectedItem={setSelectedShowEntry} /> */}
              <span>data</span>
            </div>
            <div className="relative text-gray-600 focus-within:text-gray-100">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">
                  {/* <SolidIcon.Search className="text-gray-500 w-5 h-5" /> */}
                </span>
              </div>
              <input type="text" name="q" className="py-2 text-sm text-gray-500 bg-gray-200 rounded-md pl-10 pr-2 focus:outline-none focus:bg-gray-100 focus:text-gray-900" placeholder="Pencarian" autoComplete="off" />
            </div>
          </div>
          <Table color="primary-darkest" className="rounded-b-xl rounded-t-xl">
            <thead className="bg-primary">
              <tr>
                <Th className="text-center">
                  No
                </Th>
                <Th className="text-center">
                  Nama
                </Th>
                <Th className="text-center">
                  E-mail
                </Th>
                <Th className="text-center">
                  Rol
                </Th>
                <Th className="text-center">
                  Dibuat pada
                </Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td className="text-center">1</Td>
                <Td className="text-center">Daffa</Td>
                <Td className="text-center">daffa@rabbanee.com</Td>
                <Td className="text-center">Admin</Td>
                <Td className="text-center">22 Agustus 2020</Td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-xl">
        </div>
      </div>
    </LayoutWithSidebar>
  );
};

export default OnlineExams;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});