import showEntries from '@data/show-entries';
import ContainerBody from '@elements/container/Body';
import Container from '@elements/container/Index';
import Table from '@elements/Table';
import Td from '@elements/Td';
import Th from '@elements/Th';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import InputWithIcon from '@modules/InputWithIcon';
import ListBox from '@modules/ListBox';
import Pagination from '@modules/Pagination';
import React, { useEffect, useState } from 'react';
import * as SolidIcon from '@elements/icon/Solid';
import * as Button from '@elements/Button';
import Link from 'next/link';

const ExamForStudent = ({ user }) => {
  const [selectedShowEntry, setSelectedShowEntry] = useState(showEntries[0]);

  useEffect(() => {
    console.log(selectedShowEntry);
    
  }, [selectedShowEntry]);

  return (
    <LayoutWithSidebar user={user} title="Ujian">
      <Container>
        <ContainerBody className="rounded-b-xl">
          <h2 className="text-4xl font-bold	text-black mb-2">Ujian</h2>
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
                <Th className="text-xs uppercase">
                  Judul
                </Th>
                <Th className="text-xs uppercase">
                  Pelajaran
                </Th>
                <Th className="text-xs uppercase">
                  Tanggal Mulai
                </Th>
                <Th className="text-xs uppercase">
                  Tanggal Selesai
                </Th>
                <Th className="text-xs uppercase">
                  Guru
                </Th>
                <Th className="text-xs uppercase">
                  Status
                </Th>
                <Th className="text-xs uppercase">
                  Aksi
                </Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Td className="text-sm whitespace-nowrap text-black">Tes Evaluasi - Mekanika</Td>
                <Td className="text-sm whitespace-nowrap text-black">Fisika</Td>
                <Td className="text-sm whitespace-nowrap text-black">05/01/2020 07:00</Td>
                <Td className="text-sm whitespace-nowrap text-black">08/31/2023 23:00</Td>
                <Td className="text-sm whitespace-nowrap text-black">Sabda</Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-blue-100 p-2 rounded text-blue-400">Belum dimulai</span>
                </Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <Button.Primary disabled={true} className="cursor-not-allowed opacity-80">Ikut Ujian</Button.Primary>
                </Td>
              </tr>
              <tr>
                <Td className="text-sm whitespace-nowrap text-black">Tes Evaluasi - Matriks</Td>
                <Td className="text-sm whitespace-nowrap text-black">Matematika</Td>
                <Td className="text-sm whitespace-nowrap text-black">05/01/2020 07:00</Td>
                <Td className="text-sm whitespace-nowrap text-black">08/31/2023 23:00</Td>
                <Td className="text-sm whitespace-nowrap text-black">Sabda</Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-green-100 p-2 rounded text-green-400">Sedang dimulai</span>
                </Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <Link href="/exams/room/1">
                    <a className="btn btn-primary">Ikut Ujian</a>
                  </Link>
                </Td>
              </tr>
              <tr>
                <Td className="text-sm whitespace-nowrap text-black">Tes Evaluasi - Atom</Td>
                <Td className="text-sm whitespace-nowrap text-black">Kimia</Td>
                <Td className="text-sm whitespace-nowrap text-black">05/01/2020 07:00</Td>
                <Td className="text-sm whitespace-nowrap text-black">08/31/2023 23:00</Td>
                <Td className="text-sm whitespace-nowrap text-black">Sabda</Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <span className="bg-red-100 p-2 rounded text-red-400">Sudah berakhir</span>
                </Td>
                <Td className="text-sm whitespace-nowrap text-black">
                  <Link href="/exams/result/1">
                    <a className="btn btn-primary">Lihat Hasil</a>
                  </Link>
                </Td>
              </tr>
            </tbody>
          </Table>
          <Pagination />
        </ContainerBody>
      </Container>
    </LayoutWithSidebar>
  );
};

export default ExamForStudent;