import Container from '@elements/container/Index';
import ContainerBody from '@elements/container/Body';
import { User } from '@interface/User';
import LayoutWithSidebar from '@layouts/LayoutWithSidebar';
import { withAuthServerSideProps } from '@lib/withAuthServerSide';
import Table from '@elements/Table';
import Th from '@elements/Th';
import Td from '@elements/Td';
import ListBox from '@modules/ListBox';
import InputWithIcon from '@modules/InputWithIcon';
import * as SolidIcon from '@elements/icon/Solid';
import showEntries from '@data/show-entries';
import { useState } from 'react';
import Pagination from '@modules/Pagination';
import * as Button from '@elements/Button';
import Modal from '@elements/Modal';
import ModalBody from '@elements/ModalBody';
import ModalFooter from '@elements/ModalFooter';
import * as OutlineIcon from '@elements/icon/Outline';
import Link from 'next/link';
import learningMaterials from '@data/learning-materials';


interface ChapterProps {
  user: User,
}

const Chapter = ({ user }: ChapterProps) => {
  return (
     <>
        <ModalBody className="sm:px-6">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <OutlineIcon.Exclamation className="h-6 w-6 text-red-600"/>
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Hapus Materi Pembelajaran
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Apakah Anda yakin ingin menghapus materi pembelajaran ini? jika ini dihapus maka akan terhapus selamanya.
                </p>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="sm:px-6">
          <Button.Danger className="w-full inline-flex justify-center shadow-sm text-base font-medium sm:ml-3 sm:w-auto sm:text-sm">
            Hapus
          </Button.Danger>
          <Button.Secondary type="button" className="mt-3 w-full inline-flex justify-center shadow-sm text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"> 
            Batal
          </Button.Secondary>
        </ModalFooter>
      
    <LayoutWithSidebar title="BAB" user={user}>
        <Container>
          <ContainerBody className="rounded-b-xl space-y-2">
            <div className="flex justify-between">
              <h2 className="text-3xl font-bold	text-black mb-2"> List BAB </h2>
              <Link href="/learning-materials/add">
                <Button.Primary type="button" className="inline-flex items-center">
                  <SolidIcon.Plus className="-ml-1 mr-1 h-5 w-5" /> 
                  Tambah BAB
                </Button.Primary>
              </Link>
            </div>
            <div className="flex justify-between space-y-3">
              <div className="flex justify-center items-center self-end space-x-1">
                <span className="text-md">Tampilkan</span>
                {/* <ListBox items={showEntries} selectedItem={selectedShowEntry} setSelectedItem={setSelectedShowEntry} /> */}
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
                    Mata Pelajaran
                  </Th>
                  <Th className="text-center">
                    Bab
                  </Th>
                  <Th className="text-center">
                    Di-update pada
                  </Th>
                  <Th className="text-center">
                    Aksi
                  </Th>
                </tr>
              </thead>
            </Table>
            <Pagination />
          </ContainerBody>
        </Container>
      </LayoutWithSidebar>
    </>
  );
};

export default Chapter;
export const getServerSideProps = withAuthServerSideProps(function getServerSidePropsFunc(context: any, user: User)  {
  return {
    props: {
      user, 
    }
  };
});
