import Table from "@elements/Table";
import Td from "@elements/Td";
import Th from "@elements/Th";
import { User } from "@interface/User";
import LayoutWithSidebar from "@layouts/LayoutWithSidebar";
import { withAuthServerSideProps } from "@lib/withAuthServerSide";
import * as Button from '@elements/Button';
import { useState } from "react";
import RecapTypeButton from "@modules/RecapTypeButton";
import recapTypes from "@data/recap-types";
import ListBox from "@modules/ListBox";
import showEntries from "@data/show-entries";
import * as SolidIcon from '@elements/Icon/Solid';
import Pagination from "@modules/Pagination";
import InputWithIcon from "@modules/InputWithIcon";

interface RecapUserProps {
  user: User,
}

const RecapUser = ({ user }: RecapUserProps) => {
  const [activeRecapType, setActiveRecapType] = useState(0);
  const [selectedShowEntry, setSelectedShowEntry] = useState(showEntries[0]);

  return (
    <LayoutWithSidebar user={user} title="Rekap Pengguna">
      <div className="shadow-md container mx-auto rounded-xl">
        <div className="px-4 py-5 bg-white sm:p-6 rounded-t-xl">
          <h2 className="text-3xl font-bold	text-black mb-2">{ recapTypes[activeRecapType] }</h2>
          <div className="flex space-x-2 justify-end">
            <RecapTypeButton recapTypes={recapTypes} activeRecapType={activeRecapType} setActiveRecapType={setActiveRecapType} />
          </div>
          <div className="flex justify-between space-y-3">
            <div className="flex justify-center items-center space-x-1">
              <span className="text-md">Tampilkan</span>
              <ListBox items={showEntries} selectedItem={selectedShowEntry} setSelectedItem={setSelectedShowEntry} />
              <span>data</span>
            </div>
            <InputWithIcon Icon={<SolidIcon.Search className="text-gray-500 w-5 h-5" />}/>
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
          <Pagination />
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 rounded-b-xl">
        </div>
      </div>
    </LayoutWithSidebar>
  );
};

export default RecapUser;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});
