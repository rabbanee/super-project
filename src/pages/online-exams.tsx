import React, { useState } from 'react';
import Table from "@elements/Table";
import Td from "@elements/Td";
import Th from "@elements/Th";
import { User } from "@interface/User";
import LayoutWithSidebar from "@layouts/LayoutWithSidebar";
import { withAuthServerSideProps } from "@lib/withAuthServerSide";
import InputWithIcon from '@modules/InputWithIcon';
import ListBox from '@modules/ListBox';
import showEntries from '@data/show-entries';
import * as SolidIcon from '@elements/icon/Solid';
import Pagination from '@modules/Pagination';
import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';

interface OnlineExamsProps {
  user: User,
}

const OnlineExams = ({ user }: OnlineExamsProps) => {
  const [selectedShowEntry, setSelectedShowEntry] = useState(showEntries[0]);

  return (
    <LayoutWithSidebar user={user} title="Ujian Online">
      <Container>
        <ContainerBody>
          <h2 className="text-4xl font-bold	text-black mb-2">Ujian Online</h2>
          <div className="flex justify-between space-y-3">
            <div className="flex justify-center items-center self-end space-x-1">
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
                  Judul
                </Th>
                <Th className="text-center">
                  Pelajaran
                </Th>
                <Th className="text-center">
                  Tanggal Mulai
                </Th>
                <Th className="text-center">
                  Tanggal Selesai
                </Th>
                <Th className="text-center">
                  Guru
                </Th>
                <Th className="text-center">
                  Status
                </Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td className="text-center">Tes Evaluasi - Mekanika</Td>
                <Td className="text-center">Fisika</Td>
                <Td className="text-center">05/01/2020 07:00</Td>
                <Td className="text-center">08/31/2023 23:00</Td>
                <Td className="text-center">Sabda</Td>
                <Td className="text-center"><button className="shadow-md container mx-auto rounded-xl ">sudah</button></Td>
              </tr>
            </tbody>
          </Table>
          <Pagination />
        </ContainerBody>
      </Container>
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