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
import * as SolidIcon from '@elements/icon/Solid';
import { useState } from 'react';
import * as Button from '@elements/Button';
import Link from 'next/link';
import ConfirmationModal from '@modules/ConfirmationModal';

const ExamForTeacher = ({ user }) => {
  const [selectedShowEntry, setSelectedShowEntry] = useState(showEntries[0]);
  const [isConfirmationModalShow, setIsConfirmationModalShow] = useState(false);

  return (
    <>
      <ConfirmationModal isShow={isConfirmationModalShow} setIsShow={setIsConfirmationModalShow} title="Hapus Ujian" description="Apakah Anda yakin ingin menghapus ujian ini? jika ini dihapus maka akan terhapus selamanya." confirmText="Hapus" />
      <LayoutWithSidebar user={user} title="Ujian">
        <Container>
          <ContainerBody className="rounded-b-xl">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-4xl font-bold	text-black">Ujian</h2>
                <p className="mb-2 text-lg">{user.name}</p>
              </div>
              <Button.Primary className="inline-flex items-center">
                <SolidIcon.Plus className="h-5 w-5"/> 
                <span>Tambah Ujian</span>
              </Button.Primary>
            </div>
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
                    Kelas
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
                    Aksi
                  </Th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <Td className="text-center">Tes Evaluasi - Mekanika</Td>
                  <Td className="text-center">XII RPL</Td>
                  <Td className="text-center">Fisika</Td>
                  <Td className="text-center">05/01/2020 07:00</Td>
                  <Td className="text-center">08/31/2023 23:00</Td>
                  <Td className="text-center flex justify-center space-x-2">
                    <Link href="/exams/room/1">
                      <a className="btn btn-primary inline-flex items-center">
                        <SolidIcon.Eye className="-ml-1 mr-1 h-5 w-5" />
                        Lihat
                      </a>
                    </Link>
                    <Button.Danger onClick={() => setIsConfirmationModalShow(true)} type="button" className="inline-flex items-center">
                      <SolidIcon.Trash className="-ml-1 mr-1 h-5 w-5" /> 
                      Hapus
                    </Button.Danger>
                  </Td>
                </tr>
              </tbody>
            </Table>
            <Pagination />
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default ExamForTeacher;